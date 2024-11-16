import { defineType, defineField, defineArrayMember } from 'sanity';
import { InlineSvgPreviewItem } from '@focus-reactive/sanity-plugin-inline-svg-input';
import React from 'react';

// Define the type for InlineSvgPreviewItem props
type InlineSvgPreviewItemProps = {
  icon: string;
  title?: string;
  subtitle?: string;
};

const IconsListItem = defineType({
  type: 'object',
  name: 'iconsListItem',
  fields: [
    defineField({
      name: 'icon',
      type: 'inlineSvg',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      icon: 'icon',
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection: { icon: string; title?: string; subtitle?: string }) {
      const { icon, title, subtitle } = selection;
      return {
        title: title || 'Untitled',
        subtitle: subtitle,
        media: () =>
          React.createElement(InlineSvgPreviewItem, {
            icon,
            title,
            subtitle,
          } as InlineSvgPreviewItemProps) as React.ReactElement,
      };
    },
  },
});

const IconsList = defineType({
  name: 'iconsList',
  type: 'array',
  of: [defineArrayMember({ type: 'iconsListItem' })],
});

export { IconsListItem, IconsList };
