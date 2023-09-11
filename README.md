This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Shadcn UI Usage
Use the manual way, the CLI way causes changes to the current theme that we do not want, so we need to just do this manually.

[shadcn/ui docs](https://ui.shadcn.com/docs/components/)

## Material UI Usage
As much as possible, we want to use Shadcn for UI libraries but there are some components we needed from material UI. 
For server components, you can use the existing, or add new components to the `@/shared/utilities/material-tailwind-export.ts` file.

Material UI, should be last resort. We want to move into using only just one library and Shadcn is a better all around library than Material UI.

## Supabase Development
The app uses supabase for DB, and possibly authentication. For local development, you will need to run `supabase start` with Docker Desktop running. 
You might also need to run `supabase db pull` to retrieve the latest database schema. Run `supabase db reset` to reset yopur local DB.

## React Email and Nodemailer
In the future, the app will be able to send emails whenever there is a new booking appointment created. It should send to the doctor or front desk email, and an email confirmation to the user. We are using React Email and Nodemailer to make this happen: https://react.email/docs/integrations/nodemailer

Attributions - Flat Icon
- <a href="https://www.flaticon.com/free-icons/under-construction" title="under construction icons">Under construction icons created by winnievinzence - Flaticon</a>
