import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Titulo SEO',
      type: 'string',
      description: 'Titulo que se mostrara en buscadores y pestañas.',
      validation: (rule) => rule.max(65),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta descripcion',
      type: 'text',
      rows: 3,
      description:
        'Descripcion breve para buscadores. Idealmente entre 120 y 160 caracteres.',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'Palabras clave',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description:
        'URL canonica absoluta. Dejala vacia para usar la URL publica generada por el sitio.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Excluir de indexacion',
      type: 'boolean',
      initialValue: false,
      description: 'Evita que esta pagina aparezca en buscadores.',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Titulo Open Graph',
      type: 'string',
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: 'ogDescription',
      title: 'Descripcion Open Graph',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen Open Graph',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (rule) =>
            rule.custom((alt, context) => {
              const image = (context.parent ?? {}) as { asset?: { _ref?: string } };
              if (image.asset?._ref && !alt) {
                return 'El texto alternativo es obligatorio si agregas una imagen.';
              }

              return true;
            }),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      subtitle: 'metaDescription',
      media: 'ogImage',
    },
    prepare({ media, subtitle, title }) {
      return {
        title: title || 'SEO sin titulo definido',
        subtitle: subtitle || 'Sin meta descripcion',
        media,
      };
    },
  },
});
