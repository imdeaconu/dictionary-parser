import { Word } from "./word";

export class Dictionary {
  private _words: Array<Word> = [];

  getWords(): Array<Word> {
    return this._words;
  }

  addWord(word: Word) {
    this._words.push(word);
  }

  addSeveralWords(words: Word[]) {
    this._words.concat(words);
  }
}
