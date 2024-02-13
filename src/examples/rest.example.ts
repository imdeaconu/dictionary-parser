import { DictionaryService } from "@/dictionary/dictionary.service";
import { HttpServer } from "@/infrastructure/controllers/rest/HttpServer";
import { RestController } from "@/infrastructure/controllers/rest/rest-controller";
import { WiktionaryProvider } from "@/infrastructure/providers";

async function main() {
  const server = HttpServer.getInstance();
  const dictionaryService = new DictionaryService();
  const wiktionaryProvider = new WiktionaryProvider();
  dictionaryService.setWordProvider(wiktionaryProvider);
  const controller = new RestController();
  controller.setDictionaryService(dictionaryService);
  controller.setServer(server);

  try {
  } catch (error) {
    console.error(error);
  }
}

main();
