import { IFormElement } from "../interfaces";

const DefaultFormSchema: IFormElement[] = [
  {
    type: "actions",
    title: "",
    className: "content-actions",
    actions: [
      {
        id: "close",
        caption: "Close"
      }
    ]
  },
  {
    type: "block",
    title: "content-header",
    className: "content-header"
  },
  {
    type: "block",
    title: "",
    className: "content-body",
    children: [
      {
        type: "block",
        title: "DefaultFormSchema",
        className: "alert alert-danger"
      },
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

export default DefaultFormSchema;