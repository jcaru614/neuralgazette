# Getting Started

First, run the development server:

```bash
npm run dev

```

To replicate the Vercel deployment environment locally :

```bash
vercel dev

```

## Commands for PRISMA AND SUPABASE

### Generating a brand new Database Schema

npx prisma generate

### Open the gui

npx prisma studio

### reset migrations for database

npx prisma migrate reset

### run migration and push new changes in schema

npx prisma migrate dev

### Update the Database for dev environment only do not use in production

<!-- This command will delete all entries provided you rename any field or do not use the optional ? and is only used for speed testing dev-->

npx prisma db push

## Baseline migration Guide

this is a Guide from official documentation but you must do two things first
1- You must Drop or delete the migration_prisma table
from your database before pursuing the baseline migration.

### Step: 1

       if you have Src folder the run

       cd src

### Step: 2

       create prisma files using

       npx prisma init

### Step: 3

        npx prisma db pull

### Step : 4

        mkdir -p prisma/migrations/0_init

### Step: 5

        npx prisma migrate diff --from-empty --to-schema-datasource prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql

### Step: 6

        npx prisma migrate resolve --applied 0_init

### Step: 7

         then run migrate dev to check: **run this command after any change to Database after baseline**

        npx prisma migrate dev

## Guide for ADDING AND EDITING A FIELD FOR TABLE HAVING EXISTING DATA

### adding a FIELD

    content   String?  : new field should be added as optional or with default value

    then run: prisma migrate dev --name add field --create-only

    #SQL :  ALTER TABLE "News" ADD COLUMN     "phone" TEXT NOT NULL DEFAULT 'some_default_value';

### renaming a TABLE

                    edit  TABLE name from News to NewsStories

                    then run: prisma migrate dev --name rename-table --create-only

                       then replace the sql code below with the code in migration file

                    #SQL :  ALTER TABLE IF EXISTS "News" RENAME TO "News";

### Renaming a field

                    edit  field name from title to titles

                    then run: npx prisma migrate dev --name rename-title --create-only

                       then replace the sql code below with the code in migration file

                   #SQL : ALTER TABLE "News" RENAME COLUMN "title" TO "titles";

**run this command after any change to Database in Dev env to see if it works then uncomment out prod env and run again if no problems**

    npx prisma migrate dev

### Back-up data into another field

             first create a new column "content-backup" to

             backup the data of "content" column;

             then
         #SQL : UPDATE "News" SET "content-backup" = "content;

### When you have to limit the characters from text for example "title"

first create field "titleNew"

then run: prisma migrate dev

then run:
npm prisma migrate dev --create-only
#then Update the "titleNew" with first 255 characters of "title" by adding the sql

% : UPDATE "News" SET "titleNew" = SUBSTRING("title" FROM 1 FOR 255);

then drop the "title" field run:

npm prisma migrate dev

then run:
prisma migrate dev --name rename-titleNew-t-title --create-only

                       then replace the sql code below with the code in migration file

                   #SQL : ALTER TABLE "News" RENAME COLUMN "titleNew" TO "title";
