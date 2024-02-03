import { WordNotFoundError } from "../../../dictionary/dictionary.errors";
import { WordParams } from "../../../types/dictionary/WordParams";
import {
  IWordProvider,
  WordProviderFetchResult,
  WordProviderFetchResults,
  WordToFetch,
} from "../word.providers.types";

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

  fetch(fetchedWord: WordToFetch): Promise<WordProviderFetchResult> {
    const delay = 300;
    const foundWord = this._wordArray.find(
      (word) => word.name == fetchedWord.name,
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (foundWord) {
          const foundWordParams: WordParams = {
            name: foundWord.name,
            data: foundWord.data,
            type: foundWord.type,
          };
          resolve({ foundWord: [foundWordParams] });
        } else {
          this.notFoundWords = [...this.notFoundWords, fetchedWord];
          reject(new WordNotFoundError(fetchedWord));
        }
      }, delay);
    });
  }

  fetchSeveralWords(words: WordToFetch[]): Promise<WordProviderFetchResults> {
    const wordParams: WordParams[] = [];
    return Promise.resolve({ foundWords: wordParams, notFoundWords: words });
  }
}
