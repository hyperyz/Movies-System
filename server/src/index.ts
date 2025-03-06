import "reflect-metadata"
import { MovieModel } from './db'
import { Movie } from './entities/Movie'
import { MovieService } from "./services/MovieService"



// function getRandom(min: number, max: number) {
//     const dec = max - min

//     return Math.floor(Math.random() * dec) + min
// }
// for (let i = 0; i < 100; i++) {
//     const m = new Movie()
//     m.name = "电影" + i
//     m.areas = ["中国"]
//     m.types = ["喜剧", "动作"]
//     m.isClassic = true
//     m.timeLong = getRandom(100, 1000)
//     m.isHot = true
//     m.isComing = true

//     MovieService.add(m).then(res => {
//         log(res)
//     })
// }
const condition: any = {
    page: 3,
    limit: 5,
}
MovieService.find(condition).then(res => {
    if (res.errors.length > 0) {
        console.log(res.errors);
    } else {
        res.data.forEach(item => {
            console.log(item.name)
        })
        console.log('总数是', res.count);

    }
})


