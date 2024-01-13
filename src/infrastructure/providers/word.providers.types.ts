import { WordParams } from "../../types/dictionary/WordParams";

export type WordToFetch = {
  name: string;
  lang?: string;
};

export interface IWordProvider {
  foundWords: WordParams[];
  notFoundWords: WordToFetch[];
  fetch(word: WordToFetch): Promise<WordParams[]>;
}
