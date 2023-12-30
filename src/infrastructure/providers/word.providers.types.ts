import { Word } from "../../dictionary/word";
import { WordParams } from "../../types/dictionary/WordParams";

export type WordToFetch = {
  name: string;
};

export interface IWordProvider {
  foundWords: WordParams[];
  notFoundWords: WordToFetch[];
  fetch(word: WordToFetch): Promise<Word>;
}
