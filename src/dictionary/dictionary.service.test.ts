import { InMemoryWordProvider } from "../infrastructure/providers/in-memory/in-memory.provider";
import {
  IWordProvider,
  WordToFetch,
} from "../infrastructure/providers/word.providers.types";
import { CliDictionaryPresenter } from "./dictionary.presenters";
import { DictionaryService } from "./dictionary.service";
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
      dictionaryService.lookup([{ name: "dog" }, { name: "cat" }]);
      expect(fetchSpy).toHaveBeenCalledTimes(2);
    });
  });
});
