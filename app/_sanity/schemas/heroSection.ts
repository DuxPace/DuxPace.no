/* eslint-disable @typescript-eslint/no-explicit-any */

export const heroSection = {
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "localizedString",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "ctaText",
      title: "CTA Button Text",
      type: "localizedString",
    },
    {
      name: "ctaLink",
      title: "CTA Button Link",
      type: "string",
    },
  ],
};
