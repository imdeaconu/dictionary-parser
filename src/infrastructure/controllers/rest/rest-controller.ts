import { DictionaryService } from "@/dictionary/dictionary.service";
import { IncomingMessage, ServerResponse } from "http";
import { HttpServer } from "./HttpServer";

export class RestController {
  private _server!: HttpServer;
  private _dictionaryService!: DictionaryService;

  public setDictionaryService(service: DictionaryService) {
    this._dictionaryService = service;
  }

  public setServer(server: HttpServer) {
    this._server = server;
    this._server.setRequestListener(this._requestListener)
  }

  private _requestListener(req: IncomingMessage, res: ServerResponse) {
    if (req.method != "POST") {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.write("This API supports only POST requests.");
    }
    // if (req.method != "POST") this._handleUnsupportedRoutes(req, res);
    res.end();
  }

  private _handleUnsupportedRoutes(
    req: IncomingMessage,
    res: ServerResponse
  ): void {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.write("This API supports only POST requests.");
  }

  constructor() {}
}
