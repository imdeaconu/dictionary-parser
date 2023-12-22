import { Dictionary } from "./dictionary";
import { IDictionaryPresenter } from "./dictionary.presenters";
import { Word } from "./word";
import { IWordProvider } from "./word.providers";

export class DictionaryService {
  private _wordProvider!: IWordProvider;
  private _dictionaryPresenter!: IDictionaryPresenter;
  private _dictionary: Dictionary = new Dictionary();

  setDictionaryPresenter(presenter: IDictionaryPresenter) {
    this._dictionaryPresenter = presenter;
    return this;
  }

  setWordProvider(provider: IWordProvider) {
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

    this._dictionaryPresenter.displayDictionary(this._dictionary);
    console.log("Errors: \n", errors);
  }
}
