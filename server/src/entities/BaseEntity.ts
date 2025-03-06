import { validate } from 'class-validator'
import { plainToClass } from "class-transformer"
import { ClassConstructor } from 'class-transformer'

export abstract class BaseEntity {
    public async validateThis(skipMissing = false): Promise<string[]> {
        const errors = await validate(this, {
            skipMissingProperties: true,
        })
        const temp = errors.map(e => Object.values(e.constraints || {}))
        const result: string[] = []
        temp.forEach(e => {
            result.push(...e)
        })
        return result
    }

    protected static baseTransform<T>(cls: ClassConstructor<T>, plainObject: object): T {
        if (plainObject instanceof cls) {
            return plainObject
        }
        return plainToClass(cls, plainObject)
    }
}