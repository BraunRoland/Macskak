import { Injectable } from '@nestjs/common';
import mysql, { ResultSetHeader } from 'mysql2/promise'
import { Jatek, Macska } from './types/types.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'macskak'
})

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getMacskak() {
    const [results] = await mysqlConnection.execute(
      'SELECT id,suly,szem_szin,gazdi_id,jatek_id FROM macskak'
    )
    const rows = results as Macska[];
    return rows
  }

  async getJatekok() {
    const [results] = await mysqlConnection.execute(
      'SELECT id,nev FROM jatekok'
    )
    const rows = results as Jatek[];
    return rows;
  }

  async getMacskaBySzemSzin(szemszin: string) {
    const [results] = await mysqlConnection.execute(
      'SELECT id,suly,szem_szin,gazdi_id,jatek_id FROM macskak WHERE szem_szin LIKE ?',
      [`%${szemszin}%`]
    )
    const rows = results as Macska[];
    return rows;
  }

  async postJatek(nev: string) {
    const [post] = await mysqlConnection.execute(
      'INSERT INTO jatekok (nev) VALUES (?)',
      [nev]
    );
    const header = post as ResultSetHeader;
    const [results] = await mysqlConnection.execute(
      'SELECT id,nev FROM jatekok WHERE id = ?',
      [header.insertId]
    )
    const row = results as Jatek[];
    return row[0];
  }
}

