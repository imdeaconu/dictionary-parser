import { WordNotFoundError } from "../../../dictionary/dictionary.errors";
import { WordParams } from "../../../types/dictionary/WordParams";
import { IWordProvider, WordToFetch } from "../word.providers.types";
import {
  WiktionaryLanguage,
  WiktionaryResponse,
} from "./wiktionary.provider.types";

export class WiktionaryProvider implements IWordProvider {
  foundWords: WordParams[] = [];
  notFoundWords: WordToFetch[] = [];
  private _defaultLanguage: WiktionaryLanguage = "en";

  public async fetch(wordToFetch: WordToFetch): Promise<WordParams[]> {
    try {
      const wiktionaryResponse: Response = await fetch(
        `https://en.wiktionary.org/api/rest_v1/page/definition/${wordToFetch.name}`
      );
      const wiktionaryData =
        (await wiktionaryResponse.json()) as WiktionaryResponse;
      const foundWordParams = this._transformWiktionaryDataIntoWordParams(
        wiktionaryData,
        wordToFetch
      );
      this.foundWords = [...this.foundWords, ...foundWordParams];
      return foundWordParams;
    } catch (error) {
      this.notFoundWords = [...this.notFoundWords, wordToFetch];
      throw new WordNotFoundError(wordToFetch);
    }
  }

  private _stripHtmlTags(text: string): string {
    const HTML_TAGS_REGEX = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
    return text.replace(HTML_TAGS_REGEX, "");
  }

  private _transformWiktionaryDataIntoWordParams(
    wiktionaryData: WiktionaryResponse,
    wordToFetch: WordToFetch
  ): WordParams[] {
    const language = wordToFetch.lang
      ? wordToFetch.lang
      : this._defaultLanguage;

    const paramsFromFoundWords = wiktionaryData[language].map((foundWord) => {
      const params: WordParams = {
        name: wordToFetch.name,
        type: foundWord.partOfSpeech as any,
        data: {
          definition: this._stripHtmlTags(foundWord.definitions[0].definition),
        },
      };
      return params;
    });
    return paramsFromFoundWords;
  }
}
