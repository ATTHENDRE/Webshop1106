import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { UjOrderDto } from './ujOrder.dto.js';

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

  @Post('ujOrder')
  @Render('ujOrder')
  ujOrder(@Body() body: UjOrderDto) {
    const orderRegex = {
      productId: /^[0-9]+$/,
      product: /^[a-zA-Z0-9\s]+$/,
      customerName: /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+(\s[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)+$/,
      billingAddress: /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű\s.-]+,\s\d{4},\s[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű0-9\s./-]+$/,
      shippingAddress: /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű\s.-]+,\s\d{4},\s[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű0-9\s./-]+$/,
      phone: /^\+36(1|20|30|31|50|70|80|90)\d{7}$/,
      coupon: /^[A-Z]{2}-\d{4}$/,
      creditCard: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
      expiryDate: /^(0[1-9]|1[0-2])\/\d{2}$/,
      securityCode: /^\d{3}$/
    }
  }
}
