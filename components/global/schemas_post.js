import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'tableOfContents',
      title: 'Table of Contents',
      type: 'array',
      of: [{ type: 'tocItem' }],
      options: {
        editModal: 'popover',
      },
    }),
  ],
  hooks: {
    async beforeCreate(doc) {
      doc.tableOfContents = generateTOC(doc.content)
      return doc
    },
    async beforeUpdate(doc) {
      doc.tableOfContents = generateTOC(doc.content)
      return doc
    },
  },
})

function generateTOC(content) {
  const toc = []
  content.forEach(block => {
    if (block.style === 'h2' || block.style === 'h3') {
      toc.push({
        _type: 'tocItem',
        id: block.children[0].text.toLowerCase().replace(/\s+/g, '-'),
        title: block.children[0].text,
        level: block.style === 'h2' ? 2 : 3,
      })
    }
  })
  return toc
}