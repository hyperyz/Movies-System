import "reflect-metadata"
import { MovieModel } from './db'
import { Movie } from './entities/Movie'
import { MovieService } from "./services/MovieService"

import Express from "express"
import MovieRouter from "./routes/MovieRoute"
import UploadRouter from "./routes/UploadRoute"

const app = Express()
app.use(Express.json())
app.use("/upload", Express.static("public/upload"))
app.use("/api/movies", MovieRouter)
// 文件上传
app.use("/api/upload", UploadRouter)


app.listen(3000)


