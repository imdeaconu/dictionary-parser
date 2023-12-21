type WordType = "noun" | "adjective" | "adverb";

export class Word {
  name: string;
  type: WordType;
  definition: string;

  constructor(name: string, type: WordType, definition: string) {
    this.name = name;
    this.type = type;
    this.definition = definition;
  }
}
