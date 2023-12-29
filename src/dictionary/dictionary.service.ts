import { Dictionary } from "./dictionary";
import { FailedToFetchError, WordNotFoundError } from "./dictionary.errors";
import { IDictionaryPresenter } from "./dictionary.presenters";
import { LookupResult } from "./dictionary.types";
import { IWordProvider } from "./providers/word.providers.types";
import { Word } from "./word";

// TODO: If I'm not wrong usually it's better to set private methods after public ones for reading issues
//    but you're not obliged to follow this advice, it's really up to you
// TODO: Something is triggering me, is the handling of errors while fetching words is your dictionnaryService responsibility
//    or your wordProvider responsibility ? Doesn't your dictionnary just want to know which words have been fetched and which are not so it can then add them to his list ?
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

    // TODO: use array.map instead of forEach if you want to generate a new array
    words.forEach((word) => {
      const wordPromise = this._wordProvider.fetch({ name: word });
      wordPromises = [...wordPromises, wordPromise];
    });

    const settledPromises = await Promise.allSettled(wordPromises);
    return settledPromises;
  }

  private _handleFetchingErrors(fetchResults: PromiseSettledResult<Word>[]) {
    // TODO: rename your predicate to isRejectedPredicate to be more clear on what you intend to do
    //    I've detailed a bit more about it lower on your code
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
    // TODO: rename your predicate to isFulfilledPredicate to be more clear on what you intend to do
    //    also as a best practice you should'nt have "free" strings like "fulfilled" but rather
    //    have a fulfilledStatus: string = "fulfilled" (fulfilledStatus is not a required var name you can put what you want while it stay meaningful)
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

  // TODO: I think the display part should be in your present or otherwise the function
  //    should be called logNotFoundWords as you are using a console.error
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

  // TODO: I think you should rename your words parameter to wordsToSearch and maybe extract a type or an interface from it
  //    It will let you be more flexible in future and be more meaningful because a word in a dictionary is different from a word you search for
  public async lookup(words: string[]): Promise<LookupResult> {
    // TODO: You should rename fetchResults for a more meaningful variable name
    const fetchResults = await this._fetchWordsFromProvider(words);
    this._handleFetchingErrors(fetchResults);
    this._handleFoundWords(fetchResults);
    const result: LookupResult = {
      total: words.length,
      // TODO: I don't think foundCounter should be a private member
      //    it looks like a code smell as the counter is directly related to the words fetched, not your dictionnary
      found: this._foundCounter,
      // TODO: I would say the same for here, the words wich are not found are directly
      //    related to your fetching not your dictionnary
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
