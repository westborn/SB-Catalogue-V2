# Sculpture Bermagui - Online Catalogue

### Built with:

- ✅ Tailwind

- ✅ Typescript

- ✅ Superforms Formsnap and Zod  
  pnpm install formsnap sveltekit-superforms zod

- ✅ Shadcn-svelte  
  pnpm dlx shadcn-svelte@latest init

- ✅ Supabase  
  pnpm install @supabase/supabase-js  
  if Auth required  
  pnpm install @supabase/ssr

- ✅ Cloudinary  
  pnpm install svelte-cloudinary

- ✅ Prisma  
  pnpm install -D prisma @prisma/client  
  pnpm dlx prisma init --datasource-provider postgresql
  To start with an existing database, pnpm prisma db pull, to pull the existing schema into /prisma/schema.prisma

- To add additinal Shadcn-svelte components  
  pnpm dlx shadcn-svelte@latest add button
