export class WordNotFoundError extends Error {
  public word: string = "";
  constructor(word: string) {
    super("Word not found");
    this.word = word;
  }
}

export class FailedToFetchError extends Error {
  constructor(message: string = "Failed to fertch") {
    super(message);
  }
}
