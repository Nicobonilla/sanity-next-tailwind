import { defineQuery, groq } from 'next-sanity';

export const settingsQuery = defineQuery(groq`*[_type == "settings"][0]`);
