import { InMemoryWordProvider } from "../infrastructure/providers/in-memory/in-memory.provider";
import {
  IWordProvider,
  WordToFetch,
} from "../infrastructure/providers/word.providers.types";
import { WordParams } from "../types/dictionary/WordParams";
import { CliDictionaryPresenter } from "./dictionary.presenters";
import { DictionaryService } from "./dictionary.service";

// TODO Fix tests

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
          new Promise((resolve) => {
            const wordParams: WordParams = {
              name: "a",
              type: "noun",
              data: { definition: "weee" },
            };
            resolve({ foundWord: [wordParams] });
          }),
      );
      dictionaryService.lookup([{ name: "dog" }, { name: "cat" }]);
      expect(fetchSpy).toHaveBeenCalledTimes(2);
    });
  });
});
