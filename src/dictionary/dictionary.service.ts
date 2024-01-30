import {IWordProvider, WordProviderFetchResults, WordToFetch,} from "../infrastructure/providers/word.providers.types";
import {LookupResult} from "../types/dictionary/LookupResult";
import {Dictionary} from "./dictionary";
import {IDictionaryPresenter} from "./dictionary.presenters";
import {Word} from "./word";
import {WordParams} from "../types/dictionary/WordParams";

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

  async lookupForWordsAndShowResults(wordsToFetch: any[]) {
    this.lookup(wordsToFetch)
      .then((lookupResults) => this.showResults(lookupResults));
  }

  public async lookup(wordsToFetch: WordToFetch[]): Promise<LookupResult> {
    const providerResponse: WordProviderFetchResults = await this._wordProvider.fetchSeveralWords(wordsToFetch);

    this._addFoundWordsToDictionary(providerResponse.foundWords);

    return {
      total: wordsToFetch.length,
      found: providerResponse.foundWords,
      missing: providerResponse.notFoundWords,
    };
  }

  public showResults(lookupResult: LookupResult): void {
    this._dictionaryPresenter.displayDictionary(this._dictionary);
    this._dictionaryPresenter.displayNotFoundWords(
      lookupResult.missing
    );
  }

  private _addFoundWordsToDictionary(foundWords: WordParams[]) {
    const words: Word[] = foundWords
      .map((wordParam) => new Word(wordParam));

    this._dictionary.addSeveralWords(words);
  }
}
