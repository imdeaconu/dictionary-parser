import { Dictionary } from "./dictionary";
import { IDictionaryPresenter } from "./dictionary.presenters";
import { IWordProvider } from "./providers/word.providers.types";
import { Word } from "./word";

export class DictionaryService {
  private _wordProvider!: IWordProvider;
  private _dictionaryPresenter!: IDictionaryPresenter;
  private _dictionary: Dictionary = new Dictionary();

  setDictionaryPresenter(presenter: IDictionaryPresenter): DictionaryService {
    this._dictionaryPresenter = presenter;
    return this;
  }

  setWordProvider(provider: IWordProvider): DictionaryService {
    this._wordProvider = provider;
    return this;
  }

  async lookup(words: string[]) {
    let wordPromises: Promise<Word>[] = [];
    let errors: string[] = [];

    words.forEach((word) =>
      wordPromises.push(this._wordProvider.fetch({ name: word }))
    );
    const res = await Promise.allSettled(wordPromises);

    res.forEach((response) => {
      if (response.status == "rejected") {
        errors.push(response.reason);
        return;
      }

      this._dictionary.addWord(response.value);
    });
  }

  getResults(): void {
    this._dictionaryPresenter.displayDictionary(this._dictionary);
  }
}
