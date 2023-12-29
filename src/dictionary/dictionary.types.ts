// TODO: It would be better to have a folder with all your value objects
//    something like /types or /value-objects and have a file per type
//    it will allow a more screaming architecture and will give a clearer view on what compose your domain
//    but you can also keep it that way but if you want
export type PartOfSpeech =
  | "noun"
  | "pronoun"
  | "verb"
  | "adjective"
  | "adverb"
  | "preposition"
  | "conjunction"
  | "interjection";

export type WordData = { definition: string };

// TODO : Find a better name because Dto part is really for things external to your domain
//    maybe WordParams
export type CreateWordDto = {
  name: string;
  type: PartOfSpeech;
  data: WordData;
};

export type LookupResult = {
  total: number;
  found: number;
  missing: number;
};
