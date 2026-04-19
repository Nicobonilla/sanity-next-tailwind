import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home editorial',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'homeHeroSection',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'trustItems',
      title: 'Bloques de confianza',
      type: 'array',
      group: 'content',
      of: [{ type: 'trustItem' }],
      validation: (rule) => rule.min(1).max(6),
    }),
    defineField({
      name: 'firmIntro',
      title: 'Intro del estudio',
      type: 'homeFirmIntroSection',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'practiceAreas',
      title: 'Areas de practica',
      type: 'homePracticeAreasSection',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'leadership',
      title: 'Liderazgo',
      type: 'homeLeadershipSection',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'process',
      title: 'Metodologia',
      type: 'homeProcessSection',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'faq',
      title: 'Preguntas frecuentes',
      type: 'homeFaqSection',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'finalCta',
      title: 'CTA final',
      type: 'contactCta',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home editorial',
        subtitle: 'Contenido principal de la portada',
      };
    },
  },
});
