import { Body, Controller, Get, Post, Patch, Param, ParseIntPipe, NotFoundException, Delete} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import type { Task } from './task.interface.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    getTasks(): Promise<Task[]> {
        return this.taskService.getTasks();
    }

    @Get(':id')
    getTask(
        @Param('id', ParseIntPipe) id : number
    ) : Promise<Task>
    {
        return this.taskService.getTask(id)
    }


    @Post()
    createTask(@Body() body: CreateTaskDto) : Promise<Task> {
        return this.taskService.createTask(body.title, body.completed);
    }

    @Patch(':id')
    updateTask(
        @Param('id', ParseIntPipe) id : number,
        @Body() body : UpdateTaskDto
    ) : Promise<Task>
    {
        return this.taskService.updateTask(id, body);
    }

    @Delete(':id')
    deleteTask(
        @Param('id', ParseIntPipe) id : number,
    ) : Promise<void>
    {
        return this.taskService.deleteTask(id);
    }
}
