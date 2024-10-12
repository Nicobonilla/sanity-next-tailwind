import { defineField, defineType } from "sanity";
import { AddIcon } from "@sanity/icons";

export default defineType({
    title: 'Block Content',
    icon: AddIcon,
    name: 'blockContent',
    type: 'array',
    of: [
      {
        type: 'block',
      },
      {
        type: 'image',
        options: { hotspot: true },
      },
    ],
  })
