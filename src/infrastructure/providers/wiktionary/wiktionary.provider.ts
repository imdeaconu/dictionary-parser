import { WordNotFoundError } from "../../../dictionary/dictionary.errors";
import { WordParams } from "../../../types/dictionary/WordParams";
import {IWordProvider, WordProviderFetchResult, WordProviderFetchResults, WordToFetch} from "../word.providers.types";
import {
  WiktionaryLanguage,
  WiktionaryResponse,
} from "./wiktionary.provider.types";
import {text} from "stream/consumers";

export class WiktionaryProvider implements IWordProvider {
  private _defaultLanguage: WiktionaryLanguage = "en";
  private readonly WIKTIONARY_URL = "https://en.wiktionary.org/api/rest_v1/page/definition/";

  async fetchSeveralWords(words: WordToFetch[]): Promise<WordProviderFetchResults> {
    const foundWords: WordParams[] = [];
    const notFoundWords: WordToFetch[] = [];

    for (const wordToFetch of words) {
      try {
        const result : WordProviderFetchResult = await this.fetch(wordToFetch);

        foundWords.concat(result.foundWord);
      } catch (e: any) {
        if (!!e.word)
          notFoundWords.push(e.word);
        else
          throw new Error("Unknown error occurred");
      }
    }

    return {
      foundWords,
      notFoundWords,
    }
  }

  public async fetch(wordToFetch: WordToFetch): Promise<WordProviderFetchResult> {
    try {
      const wiktionaryResponse: Response = await fetch(
        `${this.WIKTIONARY_URL}${wordToFetch.name}`
      );
      const wiktionaryData =
        (await wiktionaryResponse.json()) as WiktionaryResponse;

      const foundWord = this._transformWiktionaryDataIntoWordParams(
        wiktionaryData,
        wordToFetch
      );

      return {
        foundWord,
      };
    } catch (error) {
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
