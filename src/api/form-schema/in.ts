import { IFormElement } from "../../interfaces";

const inSchema: IFormElement[] = [
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
        title: "Входящий",
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
            title: "Входящий",
            name: "Vn",
            readOnly: true
          },
          {
            type: "text",
            title: "Исходящий",
            name: "In",
            readOnly: true
          },
          {
            type: "text",
            title: "Откуда поступил",
            name: "Corr",
            readOnly: true
          },
          {
            type: "text",
            title: "Кому адресован",
            name: "Recipient",
            readOnly: true
          },
          {
            type: "text",
            title: "Вид доставки",
            name: "DeliveryType1",
            readOnly: true
          },
          {
            type: "text",
            title: "Тип документа",
            name: "Vid1",
            readOnly: true
          },
          {
            type: "text",
            title: "Краткое содержание",
            name: "BriefContent",
            readOnly: true
          },
          {
            type: "text",
            title: "Примечание",
            name: "Remark",
            readOnly: true
          },
          {
            type: "text",
            title: "Язык обращения",
            name: "Language",
            readOnly: true
          },
          {
            type: "text",
            title: "К-во листов/экз/прил",
            name: "Np",
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

export default inSchema;
