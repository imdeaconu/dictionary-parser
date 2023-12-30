import { WordToFetch } from "../infrastructure/providers/word.providers.types";
import { Dictionary } from "./dictionary";

export interface IDictionaryPresenter {
  displayDictionary(dictionary: Dictionary): void;
  displayNotFoundWords(wordsToSearch: WordToFetch[]): void;
}

export class CliDictionaryPresenter implements IDictionaryPresenter {
  public displayDictionary(dictionary: Dictionary): void {
    const words = dictionary.getWords();
    console.table(words);
  }

  public displayNotFoundWords(wordsToSearch: WordToFetch[]): void {
    console.error(
      `Words not found - ${wordsToSearch.length}: ${JSON.stringify(
        wordsToSearch
      )}`
    );
  }
}
