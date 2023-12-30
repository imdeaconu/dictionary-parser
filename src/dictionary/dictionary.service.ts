import {
  IWordProvider,
  WordToFetch,
} from "../infrastructure/providers/word.providers.types";
import { LookupResult } from "../types/dictionary/LookupResult";
import { Dictionary } from "./dictionary";
import { IDictionaryPresenter } from "./dictionary.presenters";
import { Word } from "./word";

export class DictionaryService {
  private _wordProvider!: IWordProvider;
  private _dictionaryPresenter!: IDictionaryPresenter;
  private _dictionary: Dictionary = new Dictionary();

  public setDictionaryPresenter(
    presenter: IDictionaryPresenter
  ): DictionaryService {
    this._dictionaryPresenter = presenter;
    return this;
  }

  public setWordProvider(provider: IWordProvider): DictionaryService {
    this._wordProvider = provider;
    return this;
  }

  public async lookup(wordsToSearch: WordToFetch[]): Promise<LookupResult> {
    await this._fetchWordsFromProvider(wordsToSearch);
    this._handleFoundWords();
    const result: LookupResult = {
      total: wordsToSearch.length,
      found: this._wordProvider.foundWords.length,
      missing: this._wordProvider.notFoundWords.length,
    };

    return result;
  }

  public getResults(): void {
    this._dictionaryPresenter.displayDictionary(this._dictionary);
    this._dictionaryPresenter.displayNotFoundWords(
      this._wordProvider.notFoundWords
    );
  }

  private async _fetchWordsFromProvider(words: WordToFetch[]): Promise<void> {
    const wordPromises = words.map((word) =>
      this._wordProvider.fetch({ name: word.name })
    );
    await Promise.allSettled(wordPromises);
  }

  private _handleFoundWords() {
    this._wordProvider.foundWords.forEach((crtWordParams) => {
      const word = new Word(crtWordParams);
      this._dictionary.addWord(word);
    });
  }
}
