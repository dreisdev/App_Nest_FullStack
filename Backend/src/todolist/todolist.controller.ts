import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import CreateTaskDto from './dtos/create-task';
import { Response } from 'express';
import { UpdateTaskDto } from './dtos/update-tasks';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) { }

  @Post('/create-task')
  async create(@Body() data: CreateTaskDto, @Res() res: Response) {
    const task = await this.todolistService.createTask(data);
    res.status(HttpStatus.CREATED).json(task);
  }

  @Get()
  async getTaks(@Res() res: Response) {
    const tasks = await this.todolistService.findAllTasks();
    res.status(HttpStatus.OK).json(tasks);
  }

  @Get('/detail/:id')
  async getDetailTask(@Param('id') id: string, @Res() res: Response) {
    const task = await this.todolistService.findTaskById(id);
    res.status(HttpStatus.OK).json(task);
  }

  @Patch('/update/:id')
  async updateTask(@Res() res: Response, @Body() data: UpdateTaskDto, @Param('id') id: string) {
    const task = await this.todolistService.updateTask(id, data);
    res.status(HttpStatus.CREATED).json(task);
  }

  @Delete('/delete/:id')
  async delTask(@Res() res: Response, @Param('id') id: string) {
    await this.todolistService.deleteTask(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }

}
