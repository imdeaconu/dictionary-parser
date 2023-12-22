import { CliDictionaryPresenter } from "./dictionary/dictionary.presenters";
import { DictionaryService } from "./dictionary/dictionary.service";
import { InMemoryWordProvider } from "./dictionary/word.providers";

function main() {
  const dictionaryService = new DictionaryService();
  dictionaryService
    .setWordProvider(new InMemoryWordProvider())
    .setDictionaryPresenter(new CliDictionaryPresenter());

  dictionaryService
    .lookup(["dog", "cat", "meerkat"])
    .then(() => dictionaryService.getResults());
}

main();
