import { Movie } from './entities/Movie';
import { validate } from 'class-validator';

const m = new Movie();
m.name = '123'
m.types = ['喜剧']
validate(m).then(errors => {
    console.log(errors);
})