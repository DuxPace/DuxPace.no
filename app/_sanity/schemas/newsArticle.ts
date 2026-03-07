/* eslint-disable @typescript-eslint/no-explicit-any */

export const newsArticle = {
  name: "newsArticle",
  title: "News Article",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "localizedText",
      validation: (Rule: any) => Rule.max(200),
    },
    {
      name: "content",
      title: "Content",
      type: "localizedRichText",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "image",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "publishedAt",
      media: "image",
    },
  },
};
