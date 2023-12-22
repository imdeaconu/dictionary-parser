import { Word } from "../word";

export type WordToFetch = {
  name: string;
};

export interface IWordProvider {
  fetch(word: WordToFetch): Promise<Word>;
}
