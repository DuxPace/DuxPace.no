export const localizedString = {
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    {
      name: "no",
      title: "Norsk",
      type: "string",
    },
    {
      name: "en",
      title: "English",
      type: "string",
    },
  ],
};

export const localizedText = {
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    {
      name: "no",
      title: "Norsk",
      type: "text",
    },
    {
      name: "en",
      title: "English",
      type: "text",
    },
  ],
};

export const localizedRichText = {
  name: "localizedRichText",
  title: "Localized Rich Text",
  type: "object",
  fields: [
    {
      name: "no",
      title: "Norsk",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
