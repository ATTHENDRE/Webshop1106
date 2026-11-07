import { Controller, Get, Render, Post, Body, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service.js';
import { UjOrderDto } from './ujOrder.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'Autó Megrendelés'
    }
  }

  @Post('ujOrder')
  @Render('ujOrder')
  async ujOrder(@Body() body: any) {
    const orderRegex = {
      customerName: /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+(\s[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)+$/,
      billingAddress: /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű\s.-]+,\s\d{4},\s[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű0-9\s./-]+$/,
      shippingAddress: /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű\s.-]+,\s\d{4},\s[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű0-9\s./-]+$/,
      phoneInput: /^\+36(1|20|30|31|50|70|80|90)\d{7}$/,
      coupon: /^[A-Z]{2}-\d{4}$/,
      creditCard: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
      expiryDate: /^(0[1-9]|1[0-2])\/\d{2}$/,
      securityCode: /^\d{3}$/
    };

    if (
      !orderRegex.customerName.test(body.customerName) ||
      !orderRegex.billingAddress.test(body.billingAddress) ||
      !orderRegex.shippingAddress.test(body.shippingAddress) ||
      !orderRegex.phoneInput.test(body.phoneInput) ||
      (body.coupon && !orderRegex.coupon.test(body.coupon)) || 
      !orderRegex.creditCard.test(body.creditCard) ||
      !orderRegex.expiryDate.test(body.expiryDate) ||
      !orderRegex.securityCode.test(body.securityCode)
    ) {
      throw new BadRequestException('Hiba: A megadott adatok nem felelnek meg a formátumnak.');
    }

    let productId = 1;
    let productName = 'Benz Patent-Wagen';

    if (body.optradio === 'dacia_duster') {
      productId = 2;
      productName = 'Dacia Duster';
    }

    await this.appService.ujOrder(
      productName,
      body.customerName,
      body.billingAddress,
      body.shippingAddress
    );

    return {
      title: 'Sikeres rendelés!',
      customerName: body.customerName
    };
  }
}

