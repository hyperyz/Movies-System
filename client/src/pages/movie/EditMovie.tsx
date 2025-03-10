import { useEffect, useState } from "react";
import { useParams } from "react-router"
import MovieForm from "../../components/MovieForm";
import { IMovie, MovieService } from "../../services/MovieService";


export default function EditMovie() {
    const params = useParams()
    const [movie, setMovie] = useState<IMovie | undefined>(undefined)

    useEffect(() => {
        async function getMovieById(id: string) {
            const resp = await MovieService.getMovieById(id)

            if (resp.data) {
                setMovie(resp.data)
            }
        }
        getMovieById(params.id!)
    }, [])

    return (
        <MovieForm
            movie={movie}
            onSubmit={async (movie) => {
                const resp = await MovieService.edit(params.id!, movie)
                if (resp.data) {
                    return ""
                } else {
                    return resp.err
                }
            }
            }
        />
    )
}