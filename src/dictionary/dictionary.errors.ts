import { WordToFetch } from "../infrastructure/providers/word.providers.types";

export class WordNotFoundError extends Error {
  public word: WordToFetch = { name: "" };
  constructor(word: WordToFetch) {
    super("Word not found");
    this.word = word;
  }
}

export class FailedToFetchError extends Error {
  constructor(message: string = "Failed to fetch") {
    super(message);
  }
}
