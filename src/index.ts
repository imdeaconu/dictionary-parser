import { CliDictionaryPresenter } from "./dictionary/dictionary.presenters";
import { DictionaryService } from "./dictionary/dictionary.service";
import { InMemoryWordProvider } from "./word/word.providers";

async function main() {
  const dictionaryService = new DictionaryService();
  dictionaryService
    .setWordProvider(new InMemoryWordProvider())
    .setDictionaryPresenter(new CliDictionaryPresenter());

  await dictionaryService.lookup(["dog", "cat", "meerkat"]);
}

main().then().catch();
