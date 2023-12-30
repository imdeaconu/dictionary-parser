import { PartOfSpeech } from "../types/dictionary/PartOfSpeech";
import { WordData } from "../types/dictionary/WordData";
import { WordParams } from "../types/dictionary/WordParams";

export class Word {
  name: string;
  type: PartOfSpeech;
  data: WordData;

  constructor(wordParams: WordParams) {
    this.name = wordParams.name;
    this.type = wordParams.type;
    this.data = wordParams.data;
  }
}
