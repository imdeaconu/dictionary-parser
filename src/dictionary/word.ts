import { CreateWordDto, PartOfSpeech, WordData } from "./dictionary.types";

export class Word {
  name: string;
  type: PartOfSpeech;
  data: WordData;

  constructor(CreateWordDto: CreateWordDto) {
    this.name = CreateWordDto.name;
    this.type = CreateWordDto.type;
    this.data = CreateWordDto.data;
  }
}
