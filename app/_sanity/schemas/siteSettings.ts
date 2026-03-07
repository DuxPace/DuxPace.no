/* eslint-disable @typescript-eslint/no-explicit-any */

export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Site Title",
      type: "localizedString",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Site Description",
      type: "localizedText",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (Rule: any) => Rule.email(),
    },
    {
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "twitter", title: "Twitter", type: "url" },
        { name: "github", title: "GitHub", type: "url" },
      ],
    },
  ],
};
