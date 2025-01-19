import { CogIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

import * as demo from '@/sanity/lib/demo';

export default defineType({
  name: 'settings',
  title: 'Configuración General',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'structure',
      title: 'Estructura de la Página',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la página',
      type: 'string',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
      group: 'structure',
    }),
    defineField({
      name: 'description',  
      description: 'Usado tanto para la descripción de <meta> tag para SEO.',
      title: 'Description',
      type: 'array',
      initialValue: demo.description,
      group: 'seo',
      of: [
        defineArrayMember({
          type: 'block',
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              defineField({
                type: 'object',
                name: 'link',
                fields: [
                  {
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (rule) => rule.required(),
                  },
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'footer',
      description: 'Este texto se mostrará al final de la página.',
      title: 'Pie de página',
      type: 'array',
      group: 'structure',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description:
        'Imagen que se mostrará en tarjeta de redes sociales (cuando se comparte la página).',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Importante para accesabilidad y SEO.',
          title: 'Texto alternativo',
          type: 'string',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                return 'Required';
              }
              return true;
            });
          },
          group: 'seo',
        }),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
              More information
            </a>
          ),
        }),
      ],
    }),
    defineField({
      name: 'withDarkTheme',
      title: 'La web contempla Dark Theme?',
      type: 'boolean',
      group: 'structure',
    }),
    defineField({
      name: 'notFoundImage',
      description:
        'This is the image that will show when an image is not found.',
      title: 'Not Found Image',
      type: 'image',
      group: 'structure',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      };
    },
  },
});
