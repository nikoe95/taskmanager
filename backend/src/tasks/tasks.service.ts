import { Injectable, NotFoundException } from '@nestjs/common';
//import type { Task } from './task.interface.js';
import { InjectRepository,  } from '@nestjs/typeorm';
import { Repository } from "typeorm"
import { Task } from './task.entity.js'
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
    constructor( @InjectRepository(Task)
    private taskRepository : Repository<Task>,) {};

    getTasks() : Promise<Task[]>
    {
        return this.taskRepository.find();
    }

    async getTask(id : number) : Promise<Task>
    {
        const task =  await this.taskRepository.findOneBy( { id });
        if(!task) {
            throw new NotFoundException('Id not found');
        }
        return task;
    }

    createTask(title: string, completed : boolean) : Promise<Task>
    {
        return this.taskRepository.save( {title, completed });
    } 

    async updateTask(id : number, updates : UpdateTaskDto
    ) : Promise<Task>
    {
        let task = await this.taskRepository.findOneBy( { id });
        if(!task) {
            throw new NotFoundException("Id not found");
        }

        task.title = updates.title ?? task.title;
        task.completed = updates.completed ?? task.completed;

        return this.taskRepository.save( task );
    }

    async deleteTask(id : number) : Promise<void>
    {
        const result = await this.taskRepository.delete ( { id });
        if(result.affected === 0) {
            throw new NotFoundException("Id not found");
        } 
    }
}
