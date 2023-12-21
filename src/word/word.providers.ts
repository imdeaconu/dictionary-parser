import { Word } from "./word";

type WordToFetch = {
  name: string;
};

// TODO: I would move this error to it's proper file as you may need to intercept it in your dictionary.service
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
    // TODO: you can use Array.find() here
    const wordIndex = this._wordArray.indexOf(word.name);
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        // TODO: so you don't have to check index here
        if (wordIndex === -1) reject(new WordNotFoundError(word.name));
        // TODO: and you won't have to get object from array here
        //    also what happens if the word is an object like a spoon ?
        //    and what happens if it's not a noun ?
        resolve(new Word(this._wordArray[wordIndex], "noun", "An animal"));
      }, 300)
    );
  }
}
