import "reflect-metadata"
import { MovieModel } from './db'
import { Movie } from './entities/Movie'
import { MovieService } from "./services/MovieService"

import Express from "express"
import MovieRouter from "./routes/MovieRoute"
const app = Express()
app.use(Express.json())

app.use("/api/movies", MovieRouter)


app.listen(3000)


