export type WiktionaryLanguage = "en" | "fr";
type WiktionaryDefinition = {
  definition: string;
};
export type WiktionaryWord = {
  partOfSpeech: string;
  language: string;
  definitions: WiktionaryDefinition[];
};

export type WiktionaryResponse = Record<
  WiktionaryLanguage | string,
  WiktionaryWord[]
>;
