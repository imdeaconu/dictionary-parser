export class WordNotFoundError extends Error {
  constructor(word: string) {
    super(word);
    this.name = "Word not found";
  }
}
