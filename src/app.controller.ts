import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { CreateJatekDto } from './types/CreateJatek.dto.js';

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

  @Get('macskaKeres')
  @Render('macskaKeres')
  async getMacskaKeres(@Query('szemszin')szemszin: string = '') {
    return {
      cats: await this.appService.getMacskaBySzemSzin(szemszin)
    }
  }

  @Get('ujJatek')
  @Render('ujJatek')
  getUjjatek() {}

  @Post('ujJatek')
  @Render('ujJatek')
  async postUjJatek(@Body() body: CreateJatekDto) {
    try {
      if(body.nev == '') { throw new Error('A név nem lehet üres!') }
      return {
        p: await this.appService.postJatek(body.nev),
        siker: true
      }
    }
    catch (err) {
      if (err instanceof Error) {
        return {
          siker: false,
          p: err.message
        }
      }
    }
  }
}
