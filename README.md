# The Neural Gazette - Your AI-Powered News Source

Welcome to The Neural Gazette, your trusted source for fast, concise, and unbiased news, all powered by Artificial Intelligence (AI). We're committed to revolutionizing your news consumption experience through AI technology.

- **AI-Powered News:** Our AI algorithms collect and analyze news articles to provide you with unbiased, personalized news content.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Commands

## Generatig a brand new Database Schema
<!-- deletes everything so dont use -->
npx prisma generate
## Modifying the Prisma Database Schema
<!-- opens up the gui -->
npx prisma studio
### reset db
prisma migrate reset
### Step 1: run migration
<!-- will push new changes in schema -->
npx prisma migrate dev --name migrationName
### Step 3: Update the Database
<!-- will push new changes in schema -->
<!-- Prototyping? Use the db push command if you are prototyping and are not concerned with data loss or replicating your changes in other environments. You can start or continue your migration history when you are happy with your changes. -->
npx prisma db push
<!-- Try below for production maybe it wont erase-->
npx prisma migrate deploy