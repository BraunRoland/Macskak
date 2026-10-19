import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('macskak')
  @Render('macskak')
  async getMacskak() {
    return {
      cats: await this.appService.getMacskak()
    }
  }

  @Get('jatekok')
  @Render('jatekok')
  async getJatekok() {
    return {
      toys: await this.appService.getJatekok()
    }
  }
}
