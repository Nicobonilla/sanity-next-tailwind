import { createClient } from '@sanity/client';

const HOME_ID = '6f373d9e-746a-413e-8617-18cd20cfecc0';
const KEYS_TO_DISABLE = ['c73236624f35', 'e49fc9cc176f'];

async function run() {
  const token = process.env.SANITY_AUTH_TOKEN;

  if (!token) {
    throw new Error('SANITY_AUTH_TOKEN is required');
  }

  const client = createClient({
    projectId: 'c5h3hsr1',
    dataset: 'production',
    apiVersion: '2023-10-01',
    token,
    useCdn: false,
  });

  const home = await client.getDocument(HOME_ID);

  if (!home) {
    throw new Error(`Home document not found: ${HOME_ID}`);
  }

  const components = Array.isArray(home.components) ? home.components : [];
  const nextComponents = components.map(
    (component: { _key?: string; isActive?: boolean }) => {
      if (!component?._key || !KEYS_TO_DISABLE.includes(component._key)) {
        return component;
      }

      return {
        ...component,
        isActive: false,
      };
    }
  );

  await client.patch(HOME_ID).set({ components: nextComponents }).commit();

  const changed = nextComponents
    .filter((component: { _key?: string; isActive?: boolean }) =>
      KEYS_TO_DISABLE.includes(component?._key || '')
    )
    .map((component: { _key?: string; isActive?: boolean }) => ({
      key: component._key,
      isActive: component.isActive,
    }));

  console.log(JSON.stringify({ homeId: HOME_ID, changed }, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
