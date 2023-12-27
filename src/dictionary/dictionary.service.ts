import { Dictionary } from "./dictionary";
import { FailedToFetchError, WordNotFoundError } from "./dictionary.errors";
import { IDictionaryPresenter } from "./dictionary.presenters";
import { LookupResult } from "./dictionary.types";
import { IWordProvider } from "./providers/word.providers.types";
import { Word } from "./word";

export class DictionaryService {
  private _wordProvider!: IWordProvider;
  private _dictionaryPresenter!: IDictionaryPresenter;
  private _dictionary: Dictionary = new Dictionary();
  private _notFoundWords: string[] = [];
  private _hasNetworkError: boolean = false;
  private _foundCounter: number = 0;

  private async _fetchWordsFromProvider(
    words: string[]
  ): Promise<PromiseSettledResult<Word>[]> {
    let wordPromises: Promise<Word>[] = [];

    words.forEach((word) => {
      const wordPromise = this._wordProvider.fetch({ name: word });
      wordPromises = [...wordPromises, wordPromise];
    });

    const settledPromises = await Promise.allSettled(wordPromises);
    return settledPromises;
  }

  private _handleFetchingErrors(fetchResults: PromiseSettledResult<Word>[]) {
    const isRejected = (
      input: PromiseSettledResult<unknown>
    ): input is PromiseRejectedResult => input.status === "rejected";

    const rejectedPromises = fetchResults.filter(isRejected);

    for (const promise of rejectedPromises) {
      const error = promise.reason;
      if (error instanceof FailedToFetchError) this._hasNetworkError = true;
      if (error instanceof WordNotFoundError)
        this._notFoundWords = [...this._notFoundWords, error.word];
    }
  }

  private _handleFoundWords(fetchResults: PromiseSettledResult<Word>[]) {
    const isFulfilled = (
      input: PromiseSettledResult<unknown>
    ): input is PromiseFulfilledResult<Word> => input.status === "fulfilled";

    const fulfilledPromises = fetchResults.filter(isFulfilled);

    for (const promise of fulfilledPromises) {
      const word = promise.value;
      this._dictionary.addWord(word);
      this._foundCounter++;
    }
  }

  private _displayNotFoundWords() {
    console.error(
      `Words not found - ${this._notFoundWords.length}: ${JSON.stringify(
        this._notFoundWords
      )}`
    );
  }

  public setDictionaryPresenter(
    presenter: IDictionaryPresenter
  ): DictionaryService {
    this._dictionaryPresenter = presenter;
    return this;
  }

  setWordProvider(provider: IWordProvider): DictionaryService {
    this._wordProvider = provider;
    return this;
  }

  public async lookup(words: string[]): Promise<LookupResult> {
    const fetchResults = await this._fetchWordsFromProvider(words);
    this._handleFetchingErrors(fetchResults);
    this._handleFoundWords(fetchResults);
    const result: LookupResult = {
      total: words.length,
      found: this._foundCounter,
      missing: this._notFoundWords.length,
    };

    if (this._hasNetworkError) throw new FailedToFetchError();
    return result;
  }

  public getResults(): void {
    this._dictionaryPresenter.displayDictionary(this._dictionary);
    this._displayNotFoundWords();
  }
}
