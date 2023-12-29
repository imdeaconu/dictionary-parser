import { CreateWordDto, PartOfSpeech, WordData } from "./dictionary.types";

export class Word {
  name: string;
  type: PartOfSpeech;
  data: WordData;

  // TODO: The object you pass to your Word Constructor should only be used for this constructor
  //    having an internal interface or type IWordParams would be better In my opinion
  constructor(CreateWordDto: CreateWordDto) {
    this.name = CreateWordDto.name;
    this.type = CreateWordDto.type;
    this.data = CreateWordDto.data;
  }
}
