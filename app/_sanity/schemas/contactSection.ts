/* eslint-disable @typescript-eslint/no-explicit-any */

export const contactSection = {
  name: "contactSection",
  title: "Contact Section",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Section Title",
      type: "localizedString",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "localizedString",
    },
    {
      name: "formLabels",
      title: "Form Labels",
      type: "object",
      fields: [
        { name: "name", title: "Name Label", type: "localizedString" },
        { name: "email", title: "Email Label", type: "localizedString" },
        { name: "message", title: "Message Label", type: "localizedString" },
        { name: "submit", title: "Submit Button", type: "localizedString" },
        { name: "success", title: "Success Message", type: "localizedString" },
        { name: "error", title: "Error Message", type: "localizedString" },
      ],
    },
    {
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        { name: "email", title: "Email", type: "string" },
        { name: "phone", title: "Phone", type: "string" },
        { name: "address", title: "Address", type: "localizedString" },
      ],
    },
  ],
};
