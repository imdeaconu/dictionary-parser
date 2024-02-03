import { CliDictionaryPresenter } from "@/dictionary/dictionary.presenters";
import { DictionaryService } from "@/dictionary/dictionary.service";
import { WiktionaryProvider } from "@/infrastructure/providers";

async function main() {
  const dictionaryService = new DictionaryService();
  dictionaryService
    .setWordProvider(new WiktionaryProvider())
    .setDictionaryPresenter(new CliDictionaryPresenter());

  const wordsToFetch: any[] = [
    { name: "dog" },
    { name: "cat" },
    { name: "meerkat" },
    { name: "prieten", lang: "ro" },
    { name: "chien", lang: "fr" },
  ];

  try {
    await dictionaryService.lookupForWordsAndShowResults(wordsToFetch);
  } catch (error) {
    console.error(error);
  }
}

main();
