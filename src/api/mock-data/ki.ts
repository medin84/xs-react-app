import { IFormElement } from "../../interfaces";

const kiSchema: IFormElement[] = [
  {
    type: "block",
    className: "content-header",
    children: [
      {
        type: "block",
        title: "Карточка исполнения",
        className: "header-title"
      }
    ]
  },
  {
    type: "block",
    className: "content-body",
    children: [
      {
        type: "fieldset",
        title: "properties",
        children: [
          {
            type: "text",
            title: "Исполнитель",
            name: "IntExecut",
            readOnly: true
          },
          {
            type: "text",
            title: "Дата исполнения",
            name: "DateIsp",
            readOnly: true
          },
          {
            type: "text",
            title: "Содержание отчета",
            name: "ShortText",
            readOnly: true
          },
          {
            type: "text",
            title: "Результат рассмотрения",
            name: "ResultView",
            readOnly: true
          }
        ]
      }
    ]
  }
];

export default kiSchema;
