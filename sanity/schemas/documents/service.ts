import { defineField, defineType } from "sanity";
import { DocumentsIcon } from "@sanity/icons";

export default defineType({
    name: 'service',
    title: 'Servicio',
    type: 'document',
    icon: DocumentsIcon,
    fields: [
    defineField({
        name: 'title',
        title: 'Título',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'content',
        title: 'Contenido',
        type: 'array',
        of: [{ type: 'block' }], // Para contenido enriquecido
      }),
    ],
  }
);