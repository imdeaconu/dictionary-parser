import {WordParams} from "./WordParams";
import {WordToFetch} from "../../infrastructure/providers/word.providers.types";

export type LookupResult = {
  total: number;
  found: WordParams[];
  missing: WordToFetch[];
};
