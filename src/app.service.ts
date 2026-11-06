import { Injectable } from '@nestjs/common';
import mysql, { RowDataPacket } from 'mysql2/promise';
import { UjOrderDto } from './ujOrder.dto.js';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'orders'
});

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
    async ujOrder(productId: number, product: string, customerName: string, billingAddress: string, shippingAddress: string){
    const [result] = await pool.execute(
      'INSERT INTO orders (productId, product, customerName, billingAddress, shippingAddress) VALUES (?, ?, ?, ?, ?)',
      [productId, product, customerName, billingAddress, shippingAddress]
    );
    console.log(result);
  }
}



