import { WordNotFoundError } from "../../../dictionary/dictionary.errors";
import { WordParams } from "../../../types/dictionary/WordParams";
import { IWordProvider, WordToFetch } from "../word.providers.types";

export class InMemoryWordProvider implements IWordProvider {
  foundWords: WordParams[] = [];
  notFoundWords: WordToFetch[] = [];
  private _wordSet: Set<WordParams> = new Set([]);
  private _wordArray: WordParams[] = new Array();

  setData(words: WordParams[]): InMemoryWordProvider {
    this._wordSet = new Set(words);
    this._wordArray = Array.from(this._wordSet);
    return this;
  }

  fetch(fetchedWord: WordToFetch): Promise<WordParams[]> {
    const delay = 300;
    const foundWord = this._wordArray.find(
      (word) => word.name == fetchedWord.name
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (foundWord) {
          this.foundWords = [...this.foundWords, foundWord];
          resolve([foundWord]);
        } else {
          this.notFoundWords = [...this.notFoundWords, fetchedWord];
          reject(new WordNotFoundError(fetchedWord));
        }
      }, delay);
    });
  }
}
