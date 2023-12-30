import { CliDictionaryPresenter } from "./dictionary/dictionary.presenters";
import { DictionaryService } from "./dictionary/dictionary.service";
import { inMemoryProviderData } from "./infrastructure/providers/in-memory/in-memory.data";
import { InMemoryWordProvider } from "./infrastructure/providers/in-memory/in-memory.provider";

function main() {
  const dictionaryService = new DictionaryService();
  dictionaryService
    .setWordProvider(new InMemoryWordProvider().setData(inMemoryProviderData))
    .setDictionaryPresenter(new CliDictionaryPresenter());

  try {
    dictionaryService
      .lookup([{ name: "Dog" }, { name: "cat" }, { name: "meerkat" }])
      .then(() => dictionaryService.getResults());
  } catch (error) {
    console.error(error);
  }
}

main();
