import { IFormElement } from "../../interfaces";

const krSchema: IFormElement[] = [
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
        caption: "Save & close",
        className: "btn-primary"
      }
    ]
  },
  {
    type: "block",
    title: "",
    className: "content-header",
    children: [
      {
        type: "block",
        title: "Поручение по документу",
        className: "header-title"
      }
    ]
  },
  {
    type: "block",
    title: "",
    className: "content-body",
    children: [
      {
        type: "fieldset",
        title: "Свойства",
        children: [
          {
            type: "text",
            title: "Автор резолюции",
            name: "AuthorRez",
            readOnly: true
          },
          {
            type: "text",
            title: "Дата резолюции",
            name: "DateRez",
            readOnly: true
          },
          {
            type: "text",
            title: "Внутренние исполнители",
            name: "IntExec",
            readOnly: true
          },
          {
            type: "text",
            title: "Текст резолюции",
            name: "Content",
            readOnly: true
          },
          {
            type: "text",
            title: "Срок исполнения",
            name: "CtrlDate",
            readOnly: true
          }
        ]
      }
    ]
  }
];

export default krSchema;
