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
    {
      name: 'images',
      title: 'Imagenes',
    },
  ],
  fields: [
    // Structura
    defineField({
      name: 'title',
      title: 'Título de la página de inicio',
      description:
        'Este título se mostrará en la barra de título del navegador.',
      type: 'string',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
      group: 'structure',
    }),
    defineField({
      name: 'templateTitle',
      title: 'Platilla de título',
      description:
        'Este título se mostrará en todas la barra de título del navegador.',
      type: 'string',
      group: 'structure',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'string',
      group: 'structure',
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
      group: 'structure',
    }),
    defineField({
      name: 'footer',
      description: 'Este texto se mostrará al final de la página.',
      title: 'Pie de página',
      type: 'array',
      group: 'structure',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'withDarkTheme',
      title: 'La web contempla Dark Theme?',
      type: 'boolean',
      group: 'structure',
    }),
    // SEO
    defineField({
      name: 'metaBaseWebsite',
      title: 'Base URL de la web',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'description',
      title: 'Breve descripción de la página. ',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      description:
        'Imagen que se mostrará en tarjeta de redes sociales (cuando se comparte la página).',
      options: {
        hotspot: true,
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
          title: 'Metadata Base',
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
    // IMAGES
    defineField({
      name: 'imageNotFoundImage',
      title: 'Not Found Image Image',
      type: 'image',
      group: 'images',
    }),
    defineField({
      name: 'imageNotFoundPage',
      title: 'Not Found Page Image',
      type: 'image',
      group: 'images',
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
