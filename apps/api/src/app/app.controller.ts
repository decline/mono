import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService, Message } from './app.service';

@Controller()
export class AppController {
  private data = 1;

  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Observable<Message> {
    console.log('data', this.data);
    this.data++;
    return this.appService.getData();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }
}
