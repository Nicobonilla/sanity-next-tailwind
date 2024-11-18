import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineCliConfig({ api: { projectId, dataset } });

// you can run npx sanity <command> from the terminal inside your Next.js application:
// npx sanity cors add. Run npx sanity help for a full list of what you can do.
