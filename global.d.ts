/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient;
  interface Window {
    gtag: any;
  }
}

let FB = window.gtag;
