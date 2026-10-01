import {IsString, IsBoolean, IsNotEmpty} from 'class-validator'

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    completed: boolean
}