import { InMemoryWordProvider } from "../word/word.providers";
import { CliDictionaryPresenter } from "./dictionary.presenters";
import { DictionaryService } from "./dictionary.service";

describe("DictionaryService", () => {
  let dictionaryService: DictionaryService;

  beforeEach(() => {
    dictionaryService = new DictionaryService();

    dictionaryService.setDictionaryPresenter(new CliDictionaryPresenter());
    dictionaryService.setWordProvider(new InMemoryWordProvider());
  });

  describe("lookup", () => {
    test("should add missing words to error array", async () => {});
  });
});
