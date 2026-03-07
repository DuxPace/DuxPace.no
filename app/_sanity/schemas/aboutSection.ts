/* eslint-disable @typescript-eslint/no-explicit-any */

export const aboutSection = {
  name: "aboutSection",
  title: "About Section",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Section Title",
      type: "localizedString",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "content",
      title: "Content",
      type: "localizedRichText",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "missionTitle",
      title: "Mission Title",
      type: "localizedString",
    },
    {
      name: "missionContent",
      title: "Mission Content",
      type: "localizedRichText",
    },
  ],
};
