import { WordNotFoundError } from "./dictionary.errors";
import { CreateWordDto } from "./dictionary.types";
import { Word } from "./word";
import { IWordProvider, InMemoryWordProvider } from "./word.providers";

describe("InMemoryProvider", () => {
  let provider: IWordProvider;

  const testData: CreateWordDto[] = [
    {
      name: "Dog",
      type: "noun",
      data: { definition: "An animal" },
    },
  ];

  beforeEach(() => {
    provider = new InMemoryWordProvider().setData(testData);
  });

  test("should fetch an existing  word", async () => {
    const word = await provider.fetch({ name: testData[0].name });
    const expectedWord = new Word(testData[0]);
    expect(word).toStrictEqual(expectedWord);
  });

  test("should throw error if word doesn't exist", async () => {
    await expect(provider.fetch({ name: "meerkat" })).rejects.toThrow(
      new WordNotFoundError("meerkat")
    );
  });
});
