import axios from "axios"
import { IResponseData, IResponseError, ISearchResult, IResponsePageData } from "./CommonTypes"
export interface IMovie {
    _id?: string,
    name: string,
    areas: string[],
    types: string[],
    timeLong: number,
    isHot: boolean,
    isComing: boolean,
    isClassic: boolean,
    description?: string,
    poster?: string
}

export class MovieService {
    public static async add(movie: IMovie): Promise<IResponseData<IMovie> | IResponseError> {
        const { data } = await axios.post('/api/movies', movie)
        return data
    }

    public static async edit(id: string, movie: IMovie): Promise<IResponseData<true> | IResponseError> {
        const { data } = await axios.put('/api/movies/' + id, movie)
        return data
    }
    public static async delete(id: string): Promise<IResponseData<true> | IResponseError> {
        const { data } = await axios.delete('/api/movies/' + id)
        return data
    }

    public static async getMovieById(id: string): Promise<IResponseData<IMovie | null>> {
        const { data } = await axios.get('/api/movies/' + id)
        return data
    }

    public static async getMovies(condition: ISearchResult): Promise<IResponsePageData<IMovie>> {
        const { data } = await axios.get('/api/movies', {
            params: condition
        })
        return data
    }
}