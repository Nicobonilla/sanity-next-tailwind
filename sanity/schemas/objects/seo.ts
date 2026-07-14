import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO y redes sociales',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Título SEO',
      description:
        'Si se deja vacío se utilizará el título principal del documento.',
      type: 'string',
      validation: (rule) =>
        rule.max(60).warning('Intenta mantener el título bajo 60 caracteres.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Descripción SEO',
      description:
        'Resumen único pensado para resultados de búsqueda y redes sociales.',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule
          .min(120)
          .max(160)
          .warning('La longitud recomendada está entre 120 y 160 caracteres.'),
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'URL canónica alternativa',
      description:
        'Úsala solo cuando este contenido deba atribuirse a otra URL.',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'noIndex',
      title: 'Excluir de buscadores',
      description: 'Añade noindex y excluye el documento del sitemap.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen para compartir',
      description: 'Formato recomendado: 1200 × 630 px.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (rule) =>
            rule.custom((alt, context) => {
              const parent = context.parent as
                | { asset?: { _ref?: string } }
                | undefined;
              return parent?.asset?._ref && !alt
                ? 'Agrega un texto alternativo para la imagen.'
                : true;
            }),
        }),
      ],
    }),
  ],
});
