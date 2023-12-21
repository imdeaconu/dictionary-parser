import { Word } from "./word";

type WordToFetch = {
  name: string;
};

export class WordNotFoundError extends Error {
  constructor(word: string) {
    super(word);
    this.name = "Word not found";
  }
}

export interface IWordProvider {
  fetch(word: WordToFetch): Promise<Word>;
}

export class InMemoryWordProvider implements IWordProvider {
  private _words: Set<string> = new Set(["dog", "cat"]);
  private _wordArray = Array.from(this._words);

  fetch(word: WordToFetch): Promise<Word> {
    const wordIndex = this._wordArray.indexOf(word.name);
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (wordIndex === -1) reject(new WordNotFoundError(word.name));
        resolve(new Word(this._wordArray[wordIndex], "noun", "An animal"));
      }, 300)
    );
  }
}
