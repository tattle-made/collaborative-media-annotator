export const samplePostUrls = [
  "https://c.files.bbci.co.uk/957C/production/_111686283_pic1.png",
  "https://c.files.bbci.co.uk/957C/production/_111686283_pic1.png",
  "https://c.files.bbci.co.uk/957C/production/_111686283_pic1.png",
];

export const sampleSchema = [
  {
    id: "first",
    label: "Please enter a number",
    type: "number",
    parameters: {
      max: 1,
      min: 20,
    },
  },
  {
    id: "second",
    label: "Please enter a string",
    type: "string",
    parameters: {
      length: 300,
      lines: 5,
    },
  },
  {
    id: "third",
    label: "Date of birth",
    type: "date",
  },
  {
    id: "fourth",
    label: "Choose one or more",
    type: "multiselect",
    parameters: {
      options: ["Option A", "Option B", "Option C"],
    },
  },
  {
    id: "fifth",
    label: "Choose one of the following",
    type: "singleselect",
    parameters: {
      name: "options",
      options: ["a", "b", "c"],
    },
  },
  // human_zones: {
  //   label: "Mark any humans in the image",
  //   type: "rectzone",
  // },
];
