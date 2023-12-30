import { PartOfSpeech } from "./PartOfSpeech";
import { WordData } from "./WordData";

export type WordParams = {
  name: string;
  type: PartOfSpeech;
  data: WordData;
};
