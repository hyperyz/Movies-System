import { ArrayMinSize, IsNotEmpty, IsInt, Min, Max, IsArray } from "class-validator"
import { plainToClass, Type } from "class-transformer"
import { validate } from "class-validator";
import { skip } from "node:test";
import { BaseEntity } from "./BaseEntity";

export class Movie extends BaseEntity {
    @IsNotEmpty({ message: "电影名称不能为空" })
    @Type(() => String)
    public name: string;

    @IsNotEmpty({ message: "电影类型不能为空" })
    @ArrayMinSize(1, { message: "电影类型至少有一个" })
    @IsArray({ message: '电影类型必须是数组' })
    @Type(() => String)
    public types: string[]

    @IsNotEmpty({ message: "上映地区不可以为空" })
    @ArrayMinSize(1, { message: "上映地区至少有一个" })
    @IsArray({ message: '上映地区必须是数组' })
    @Type(() => String)
    public areas: string[]

    @IsNotEmpty({ message: "电影时长不能为空" })
    @IsInt({ message: "电影时长必须为整数" })
    @Min(1, { message: "电影时长必须大于0" })
    @Max(1000, { message: "时长过长" })
    @Type(() => Number)
    public timeLong: number;

    @IsNotEmpty({ message: "是否热映不可以为空" })
    @Type(() => Boolean)
    public isHot: boolean

    @IsNotEmpty({ message: "是否即将上映不可以为空" })
    @Type(() => Boolean)
    public isComing: boolean

    @IsNotEmpty({ message: "是否是经典影片不可以为空" })
    @Type(() => Boolean)
    public isClassic: boolean

    @Type(() => String)
    public description?: string;

    @Type(() => String)
    public poster?: string;

    public static transform(plainObject: object): Movie {
        return super.baseTransform(Movie, plainObject)
    }

}