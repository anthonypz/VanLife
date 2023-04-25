# VanLife

A fullstack app for renting travel vans on your next road trip. Host your own van, or discover and rent a travel van today!

**Link to project:** http://thevanlife.netlify.app/

<img src="https://raw.githubusercontent.com/anthonypz/VanLife/main/docs/screenshots/vanlife-demo.png" alt="project demo" width="550"/>

## How It's Made:

**Tech used:** TypeScript, Remix, Clerk Auth, Supabase PostgreSQL database, Prisma, TailwindCSS, Flowbite

This project was built using Remix, which is an awesome framework that builds upon React Router. It uses nested routes, behaves like a SPA (single page app), and utilizes Remix's server concepts of 'loaders' and 'actions' to perform data reads and writes. I used Clerk for authentication and Supabase as my database hosting solution. I used Prisma to manage database CRUD operations and migrations. Finally, I used TailwindCSS together with HeroIcons and Flowbite to build out the UI.

## Optimizations

Remix already uses neat optimization techniques that help your app run smoothly such as parallel data fetching, hydration, deferred data loading for slow data requests, and limiting data loading for parts of the page that have changed via client side routing. In addition to that, I used Cloudinary to serve optimized images, which can lower the amount of data sent over the network and significantly speed up your app.

## Lessons Learned:

I've learned a whole lot about how to build client-side nested routes (it's awesome), authentication (it can get complicated), data modeling using Prisma, and many of the cool features Remix has to offer. The remix community is great and offered their help whenever I got stuck. I look forward to building other fullstack apps using Remix and learning more about it.

## Other Projects:

Check out these other projects I've built:

**Contactr:** https://contactr.fly.dev/

**InstaBrew:** https://instabrew.fly.dev/
