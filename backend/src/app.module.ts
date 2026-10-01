import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TasksModule } from './tasks/tasks.module.js';
import { TypeOrmModule} from '@nestjs/typeorm'
import { Task } from './tasks/task.entity.js'

@Module({
  imports: [TasksModule,
    TypeOrmModule.forRoot( {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'taskuser',
      password: 'taskpassword',
      database: 'task_manager',
      entities: [Task],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
