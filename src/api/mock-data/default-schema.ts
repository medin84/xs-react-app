import { IFormElement } from "../../interfaces";

const DefaultSchema: IFormElement[] = [
  {
    type: "block",
    className: "content-header",
    children: [
      {
        type: "block",
        title: "DefaultFormSchema",
        className: "header-title"
      }
    ]
  },
  {
    type: "block",
    className: "content-body",
    children: [
      {
        type: "block",
        className: "alert alert-danger",
        children: [
          {
            type: "text",
            name: "@form",
            readOnly: true,
            title: "Form"
          }
        ]
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

export default DefaultSchema;
