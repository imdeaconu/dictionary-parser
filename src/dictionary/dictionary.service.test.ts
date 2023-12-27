import { FailedToFetchError, WordNotFoundError } from "./dictionary.errors";
import { CliDictionaryPresenter } from "./dictionary.presenters";
import { DictionaryService } from "./dictionary.service";
import { InMemoryWordProvider } from "./providers/in-memory.provider";
import { IWordProvider, WordToFetch } from "./providers/word.providers.types";
import { Word } from "./word";

describe("DictionaryService", () => {
  let dictionaryService: DictionaryService;
  let provider: IWordProvider;

  beforeEach(() => {
    dictionaryService = new DictionaryService();
    provider = new InMemoryWordProvider();

    dictionaryService.setDictionaryPresenter(new CliDictionaryPresenter());
    dictionaryService.setWordProvider(provider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("lookup", () => {
    it("should fetch words from provider", () => {
      const fetchSpy = jest.spyOn(provider, "fetch");
      fetchSpy.mockImplementation(
        (word: WordToFetch) =>
          new Promise((resolve) =>
            resolve(
              new Word({ name: "a", type: "noun", data: { definition: "wee" } })
            )
          )
      );
      dictionaryService.lookup(["dog", "cat"]);
      expect(fetchSpy).toHaveBeenCalledTimes(2);
    });

    it("should throw network error", () => {
      const fetchSpy = jest.spyOn(provider, "fetch");
      fetchSpy.mockImplementation(
        (word: WordToFetch) =>
          new Promise((resolve, reject) => reject(new FailedToFetchError()))
      );
      expect(async () => {
        await dictionaryService.lookup(["Dog"]);
      }).rejects.toThrow(new FailedToFetchError());
    });

    it("should add found words to dictionary", async () => {
      const fetchSpy = jest.spyOn(provider, "fetch");
      fetchSpy.mockImplementation(
        (word: WordToFetch) =>
          new Promise((resolve) =>
            resolve(
              new Word({ name: "a", type: "noun", data: { definition: "wee" } })
            )
          )
      );
      const lookupResult = await dictionaryService.lookup(["a"]);
      expect(lookupResult).toHaveProperty("found", 1);
    });
    it("should track missing words", async () => {
      const fetchSpy = jest.spyOn(provider, "fetch");
      fetchSpy.mockImplementation(
        (word: WordToFetch) =>
          new Promise((resolve, reject) => reject(new WordNotFoundError("cat")))
      );
      const lookupResult = await dictionaryService.lookup(["cat"]);
      expect(lookupResult).toHaveProperty("missing", 1);
    });
  });
});
