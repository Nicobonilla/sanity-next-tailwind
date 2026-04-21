import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'reviewProfile',
  title: 'Perfil de reseñas',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Plataforma',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'rating',
      title: 'Puntaje',
      description: 'Use valores entre 0 y 5. Ejemplo: 4.9',
      type: 'number',
      validation: (rule) => rule.min(0).max(5),
    }),
    defineField({
      name: 'reviewCount',
      title: 'Cantidad de reseñas',
      type: 'number',
      validation: (rule) => rule.min(0).precision(0),
    }),
    defineField({
      name: 'summary',
      title: 'Resumen breve',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: 'reviewUrl',
      title: 'URL de reseñas',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texto del enlace',
      type: 'string',
      initialValue: 'Ver reseñas',
      validation: (rule) => rule.max(40),
    }),
  ],
  preview: {
    select: {
      title: 'platform',
      rating: 'rating',
      reviewCount: 'reviewCount',
    },
    prepare({ rating, reviewCount, title }) {
      const detail = [
        typeof rating === 'number' ? `${rating.toFixed(1)}/5` : null,
        typeof reviewCount === 'number' ? `${reviewCount} reseñas` : null,
      ]
        .filter(Boolean)
        .join(' · ');

      return {
        title: title || 'Perfil de reseñas',
        subtitle: detail || 'Sin datos numericos',
      };
    },
  },
});
