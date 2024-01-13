import { CliDictionaryPresenter } from "./dictionary/dictionary.presenters";
import { DictionaryService } from "./dictionary/dictionary.service";
import { WiktionaryProvider } from "./infrastructure/providers/wiktionary/wiktionary.provider";

function main() {
  const dictionaryService = new DictionaryService();
  dictionaryService
    .setWordProvider(new WiktionaryProvider())
    .setDictionaryPresenter(new CliDictionaryPresenter());

  try {
    dictionaryService
      .lookup([
        { name: "dog" },
        { name: "cat" },
        { name: "meerkat" },
        { name: "prieten", lang: "ro" },
        { name: "chien", lang: "fr" },
      ])
      .then(() => dictionaryService.getResults());
  } catch (error) {
    console.error(error);
  }
}

main();
