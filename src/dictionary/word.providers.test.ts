import { Word } from "./word";
import {
  IWordProvider,
  InMemoryWordProvider,
  WordNotFoundError,
} from "./word.providers";

describe("InMemoryProvider", () => {
  let provider: IWordProvider;

  beforeEach(() => {
    provider = new InMemoryWordProvider();
  });

  test("should fetch an existing  word", async () => {
    const word = await provider.fetch({ name: "dog" });
    const expectedWord = new Word("dog", "noun", "An animal");
    expect(word).toStrictEqual(expectedWord);
  });

  test("should throw error if word doesn't exist", async () => {
    await expect(provider.fetch({ name: "meerkat" })).rejects.toThrow(
      new WordNotFoundError("meerkat")
    );
  });
});
