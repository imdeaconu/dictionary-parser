// TODO: You can move dictionary and words in the same folder as it belong to the same domain
import { Word } from "../word/word";
import { IWordProvider } from "../word/word.providers";
import { Dictionary } from "./dictionary";
import { IDictionaryPresenter } from "./dictionary.presenters";

export class DictionaryService {
  private _wordProvider!: IWordProvider;
  private _dictionaryPresenter!: IDictionaryPresenter;
  private _dictionary: Dictionary = new Dictionary();

  // TODO: add method return type
  setDictionaryPresenter(presenter: IDictionaryPresenter) {
    this._dictionaryPresenter = presenter;
    return this;
  }

  // TODO: add method return type
  setWordProvider(provider: IWordProvider) {
    this._wordProvider = provider;
    return this;
  }

  // TODO: add method return type
  async lookup(words: string[]) {
    let wordPromises: Promise<Word>[] = [];
    let errors: string[] = [];

    words.forEach((word) =>
      wordPromises.push(this._wordProvider.fetch({ name: word }))
    );

    // TODO: How do you handle errors here ? Maybe a unit test can help you ;)
    const res = await Promise.allSettled(wordPromises);

    res.forEach((response) => {
      if (response.status == "rejected") {
        errors.push(response.reason);
        return;
      }

      this._dictionary.addWord(response.value);
    });

    // TODO: Make a public function to display dictionnary from your main file, eg: index.ts
    //    Because of SRP your function should only lookup for words but not display the dictionary content
    this._dictionaryPresenter.displayDictionary(this._dictionary);
    console.log("Errors: \n", errors);
  }
}
