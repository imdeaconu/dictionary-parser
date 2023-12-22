import { CliDictionaryPresenter } from "./dictionary/dictionary.presenters";
import { DictionaryService } from "./dictionary/dictionary.service";
import { CreateWordDto } from "./dictionary/dictionary.types";
import { InMemoryWordProvider } from "./dictionary/providers/in-memory.provider";

function main() {
  const iNmemData: CreateWordDto[] = [
    {
      name: "Dog",
      type: "noun",
      data: { definition: "An animal" },
    },
  ];
  const dictionaryService = new DictionaryService();
  dictionaryService
    .setWordProvider(new InMemoryWordProvider().setData(iNmemData))
    .setDictionaryPresenter(new CliDictionaryPresenter());

  dictionaryService
    .lookup(["Dog", "cat", "meerkat"])
    .then(() => dictionaryService.getResults());
}

main();
