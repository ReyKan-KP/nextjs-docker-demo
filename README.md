
# Running Next.js with Docker

## Task 1: Run Next.js Locally

### Steps

1. Create a Next.js app.
2. In the terminal, type `docker init` and choose the option (go for other).
3. Replace the content of `Dockerfile` with the following:

   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app
   COPY package*.json ./
   RUN npm install

   COPY . .
   EXPOSE 3000
   CMD npm run dev
   ```

4. Replace the content of `compose.yaml` with the following:

   ```yaml
   services:
     app:
       build:
         context: .
       image: nextjs-docker-demo
       ports:
         - "3000:3000"
       environment:
         NODE_ENV: development
       develop:
         watch:
           - action: sync
             path: .
             target: /app
             ignore:
               - node_modules/
           - action: rebuild
             path: package.json
   ```

5. Build your Docker image by typing in the terminal: `docker compose up --watch`.
6. The Docker image is ready.
7. Check `localhost:3000` to see if it's working.

---

## Task 2: Run Postgres Locally with Prisma ORM

### Steps

1. Follow steps 1 to 3 from **Task 1**.
2. Replace the content of `compose.yaml` with the following:

   ```yaml
   services:
     db:
       image: postgres:15-alpine
       environment:
         POSTGRES_PASSWORD: your_password
       ports:
         - "5432:5432"
   ```

3. Build your Docker image by typing in the terminal: `docker compose up`.
4. This will create a Docker image for PostgreSQL.
5. Add `Prisma ORM` to your project by typing in the terminal:

   ```bash
   npx prisma init
   ```

6. Add/change `DATABASE_URL` in `.env`.
7. Navigate to `prisma/schema.prisma` and add your model.
8. Create `utils/db.ts` and add the following Prisma client:

   ```ts
   import { PrismaClient } from '@prisma/client';

   const prismaClientSingleton = () => {
     return new PrismaClient();
   };

   declare const globalThis: {
     prismaGlobal: ReturnType<typeof prismaClientSingleton>;
   } & typeof global;

   const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

   export default prisma;

   if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
   ```

9. Modify `page.tsx` and `actions/actions.ts` to use Prisma for CRUD operations.
10. Run the following command to sync your database to Prisma:

    ```bash
    npx prisma db push
    ```

11. To check your database, run:

    ```bash
    npx prisma studio
    ```
