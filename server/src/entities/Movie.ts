import { ArrayMinSize, IsNotEmpty, IsInt, Min, Max } from "class-validator"
export class Movie {
    @IsNotEmpty({ message: "电影名称不能为空" })
    public name: string;

    @IsNotEmpty({ message: "电影类型不能为空" })
    @ArrayMinSize(1, { message: "电影类型至少有一个" })
    public types: string[]

    @IsNotEmpty({ message: "上映地区不可以为空" })
    @ArrayMinSize(1, { message: "上映地区至少有一个" })
    public areas: string[]

    @IsNotEmpty({ message: "电影时长不能为空" })
    @IsInt({ message: "电影时长必须为整数" })
    @Min(1, { message: "电影时长必须大于0" })
    @Max(1000, { message: "时长过长" })
    public timeLong: number;

    @IsNotEmpty({ message: "是否热映不可以为空" })
    public isHot: boolean

    @IsNotEmpty({ message: "是否即将上映不可以为空" })
    public isComing: boolean

    @IsNotEmpty({ message: "是否是经典影片不可以为空" })
    public isClassic: boolean

    public description?: string;

    public poster?: string;
}