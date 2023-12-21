import { IWordProvider, InMemoryWordProvider } from "../word/word.providers";
import { Dictionary } from "./dictionary";

describe("Dictionary", () => {
  let dictionary: Dictionary;
  let provider: IWordProvider;

  beforeEach(() => {
    dictionary = new Dictionary();
    provider = new InMemoryWordProvider();
  });

  test("should return empty array if there are no words", () => {
    const words = dictionary.getWords();
    expect(words).toStrictEqual([]);
  });

  test("should add word to array", async () => {
    const newWord = await provider.fetch({ name: "dog" });
    dictionary.addWord(newWord);
    const words = dictionary.getWords();
    expect(words).not.toHaveLength(0);
  });
});
