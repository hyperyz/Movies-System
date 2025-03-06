import { Movie } from "./Movie";

export interface ISearchResult<T> {
    count: number;
    data: T[];
    errors: string[]
}