import { CogIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import * as demo from '@/sanity/lib/demo';

export default defineType({
  name: 'settings',
  title: 'Configuracion general',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'structure',
      title: 'Estructura',
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
    defineField({
      name: 'title',
      title: 'Titulo de la pagina de inicio',
      description: 'Se usa en metadata y referencias institucionales.',
      type: 'string',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
      group: 'structure',
    }),
    defineField({
      name: 'templateTitle',
      title: 'Plantilla de titulo',
      description: 'Texto base para las demas paginas del sitio.',
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
      title: 'Pie de pagina',
      description: 'Texto institucional mostrado al final del sitio.',
      type: 'array',
      group: 'structure',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'defaultContentCta',
      title: 'CTA de contenido por defecto',
      type: 'contactCta',
      group: 'structure',
      description:
        'Se usa como CTA final en articulos y servicios cuando el documento no define uno propio.',
    }),
    defineField({
      name: 'withDarkTheme',
      title: 'La web contempla dark theme?',
      type: 'boolean',
      group: 'structure',
    }),
    defineField({
      name: 'metaBaseWebsite',
      title: 'Base URL de la web',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'description',
      title: 'Descripcion general',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      description:
        'Imagen que se mostrara al compartir la web en redes sociales.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Importante para accesibilidad y SEO.',
          title: 'Texto alternativo',
          type: 'string',
          validation: (rule) =>
            rule.custom((alt, context) => {
              if ((context.document?.ogImage as { asset?: { _ref?: string } })?.asset?._ref && !alt) {
                return 'Required';
              }

              return true;
            }),
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
