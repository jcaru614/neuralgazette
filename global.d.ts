/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient;
  interface Window {
    gtag: any;
    adsbygoogle: any;
  }
}

let FB = window.gtag;
