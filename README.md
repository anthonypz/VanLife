# VanLife

A fullstack app for renting travel vans on your next road trip. Host your own van, or discover and rent a travel van today!

**Link to project:** http://thevanlife.netlify.app/

<img src="https://raw.githubusercontent.com/anthonypz/VanLife/main/docs/screenshots/vanlife-demo.png" alt="project demo" width="550"/>

## How It's Made:

**Tech used:** TypeScript, Remix, Clerk Auth, Supabase PostgreSQL database, Prisma, TailwindCSS, Flowbite

This project was built using Remix, which is an awesome framework that builds upon React Router. It uses nested routes, behaves like a SPA (single page app), and utilizes Remix's server concepts of 'loaders' and 'actions' to perform data reads and writes. I used Clerk for authentication and Supabase as my database hosting solution. I used Prisma to manage database CRUD operations and migrations. Finally, I used TailwindCSS together with HeroIcons and Flowbite to build out the UI.

## Optimizations

Remix already uses neat optimization techniques that help your app run smoothly such as parallel data fetching, hydration, deferred data loading for slow network requests, and client side routing. In addition to those built in optimizations, I used Cloudinary to serve optimized images, which lowers the amount of data the user needs to fetch in order to view a page and improves the overall user experience.

## Lessons Learned:

I've learned a whole lot about how to build client-side nested routes (it's awesome), authentication, data modeling using Prisma ORM, and working with many of the built-in features Remix has to offer.

## Other Projects:

Check out these other projects I've built:

**Contactr:** https://contactr.fly.dev/

**InstaBrew:** https://instabrew.fly.dev/
