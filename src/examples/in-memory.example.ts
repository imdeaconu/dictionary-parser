import { CliDictionaryPresenter } from "@/dictionary/dictionary.presenters";
import { DictionaryService } from "@/dictionary/dictionary.service";
import { inMemoryProviderData } from "@/infrastructure/providers/in-memory/in-memory.data";
import { InMemoryWordProvider } from "@/infrastructure/providers/in-memory/in-memory.provider";
import { WordToFetch } from "@/infrastructure/providers/word.providers.types";

async function main() {
  const dictionaryService = new DictionaryService();
  dictionaryService
    .setWordProvider(new InMemoryWordProvider().setData(inMemoryProviderData))
    .setDictionaryPresenter(new CliDictionaryPresenter());

  const wordsToFetch: WordToFetch[] = [
    { name: "Dog" },
    { name: "cat" },
    { name: "meerkat" },
  ];

  try {
    await dictionaryService.lookupForWordsAndShowResults(wordsToFetch);
  } catch (error) {
    console.error(error);
  }
}

main();
