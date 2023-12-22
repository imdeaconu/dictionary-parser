import { CliDictionaryPresenter } from "./dictionary.presenters";
import { DictionaryService } from "./dictionary.service";
import { InMemoryWordProvider } from "./providers/in-memory.provider";

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
