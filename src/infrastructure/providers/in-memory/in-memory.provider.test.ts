import { WordNotFoundError } from "../../../dictionary/dictionary.errors";
import { IWordProvider } from "../word.providers.types";
import { inMemoryProviderData } from "./in-memory.data";
import { InMemoryWordProvider } from "./in-memory.provider";

// TODO Fix tests

describe("InMemoryProvider", () => {
  let provider: IWordProvider;

  beforeEach(() => {
    provider = new InMemoryWordProvider().setData(inMemoryProviderData);
  });

  it("should fetch an existing  word", async () => {
    const wordParams = await provider.fetch({
      name: inMemoryProviderData[0].name,
    });
    const expectedWord = inMemoryProviderData[0];
    expect(wordParams).toEqual([expectedWord]);
  });

  it("should throw error if word doesn't exist", async () => {
    await expect(provider.fetch({ name: "meerkat" })).rejects.toThrow(
      new WordNotFoundError({ name: "meerkat" }),
    );
  });

  it("should keep track of not found words", async () => {
    await expect(provider.fetch({ name: "meerkat" })).rejects.toThrow(
      new WordNotFoundError({ name: "meerkat" }),
    );
  });

  it("should keep track of found words", async () => {
    await provider.fetch({ name: inMemoryProviderData[0].name });
    expect(provider.foundWords).toHaveLength(1);
  });
});
