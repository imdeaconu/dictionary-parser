import { WordParams } from "../../types/dictionary/WordParams";

export type WordToFetch = {
  name: string;
  lang?: string;
};

export type WordProviderFetchResult = {
  foundWord: WordParams[];
};

export type WordProviderFetchResults = {
  foundWords: WordParams[];
  notFoundWords: WordToFetch[];
};

export interface IWordProvider {
  fetch(word: WordToFetch): Promise<WordProviderFetchResult>;

  fetchSeveralWords(words: WordToFetch[]): Promise<WordProviderFetchResults>;
}
