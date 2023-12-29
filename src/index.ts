import { CliDictionaryPresenter } from "./dictionary/dictionary.presenters";
import { DictionaryService } from "./dictionary/dictionary.service";
import { CreateWordDto } from "./dictionary/dictionary.types";
import { InMemoryWordProvider } from "./dictionary/providers/in-memory.provider";

function main() {
  // TODO: data should already been in your in-memory adapter as it should remain an custom implementation independent from your app or your domain
  const iNmemData: CreateWordDto[] = [
    {
      name: "Dog",
      type: "noun",
      data: { definition: "An animal" },
    },
  ];
  const dictionaryService = new DictionaryService();
  // TODO: As you can see here you are doing some sort of dependency injection toward your dictionary service
  //    this highlights that there is 3 main things in your project :
  //      - your app (index.ts)
  //      - your domain (/dictionnary) with all your business logic
  //      - your custom implementations of the services required by your domain (InMemoryProvider or CliPresenter for example)
  //    meaning your implementations shouldn't belong in your domain as they can change at any time
  dictionaryService
    .setWordProvider(new InMemoryWordProvider().setData(iNmemData))
    .setDictionaryPresenter(new CliDictionaryPresenter());

  try {
    dictionaryService
      .lookup(["Dog", "cat", "meerkat"])
      .then(() => dictionaryService.getResults());
  } catch (error) {
    console.error(error);
  }
}

main();
