import type { TriggerConfig } from '@trigger.dev/sdk/v3';

export const config: TriggerConfig = {
  project: 'proj_yrzgnfqmzldkmggwhldj',
  logLevel: 'log',
  additionalFiles: [
    './src/prisma/schema.prisma', // Assuming TriggerConfig is in the src folder
  ],

  additionalPackages: ['prisma@5.19.0'],
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
};
