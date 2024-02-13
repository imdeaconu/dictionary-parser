import { IncomingMessage, Server, ServerResponse, createServer } from "http";

export class HttpServer {
  private static instance: HttpServer;
  private _server: Server;

  public static getInstance() {
    if (!this.instance) this.instance = new HttpServer();
    return this.instance;
  }

  public setRequestListener(
    listener: (req: IncomingMessage, res: ServerResponse) => void
  ) {
    this._server.on("request", listener);
  }

  private _initServer() {
    this._server.listen(5000);
    console.log("Server started on port 5000");
  }

  private constructor() {
    this._server = createServer();
    this._initServer();
  }
}
