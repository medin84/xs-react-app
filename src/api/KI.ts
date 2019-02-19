import { IFormElement } from "../interfaces";

const kiSchema: IFormElement[] = [
  {
    type: "actions",
    title: "",
    className: "content-actions",
    actions: [
      {
        id: "close",
        caption: "Close"
      },
      {
        id: "save_close",
        caption: "Save & close"
      }
    ]
  },
  {
    type: "block",
    title: "KI for header",
    className: "content-header"
  },
  {
    type: "block",
    title: "",
    className: "content-body",
    children: [
      {
        type: "fieldset",
        title: "properties",
        children: [
          {
            type: "text",
            title: "Unid",
            name: "@unid",
            readOnly: true,
            className: "span7"
          },
          {
            type: "text",
            title: "Authors",
            name: "@authors",
            className: "span7",
            readOnly: true
          }
        ]
      }
    ]
  }
];

export default kiSchema;
