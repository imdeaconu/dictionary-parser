import { Dictionary } from "./dictionary";

export interface IDictionaryPresenter {
  displayDictionary(dictionary: Dictionary): void;
}

export class CliDictionaryPresenter implements IDictionaryPresenter {
  displayDictionary(dictionary: Dictionary): void {
    const words = dictionary.getWords();
    console.table(words);
  }
}
