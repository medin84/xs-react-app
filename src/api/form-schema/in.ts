import { IFormElement } from "../../interfaces";

const inSchema: IFormElement[] = [
  {
    type: "actions",
    title: "",
    className: "content-actions",
    actions: [
      {
        type: "CLOSE",
        id: "close",
        caption: "Close"
      },
      {
        type: "ACTION",
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
            readOnly: false
          },
          {
            type: "text",
            title: "Исходящий",
            name: "In",
            readOnly: false
          },
          {
            type: "text",
            title: "Откуда поступил",
            name: "Corr",
            readOnly: false
          },
          {
            type: "text",
            title: "Кому адресован",
            name: "Recipient",
            readOnly: false
          },
          {
            type: "text",
            title: "Вид доставки",
            name: "DeliveryType1",
            readOnly: false
          },
          {
            type: "text",
            title: "Тип документа",
            name: "Vid1",
            readOnly: false
          },
          {
            type: "text",
            title: "Краткое содержание",
            name: "BriefContent",
            readOnly: false
          },
          {
            type: "text",
            title: "Примечание",
            name: "Remark",
            readOnly: false
          },
          {
            type: "text",
            title: "Язык обращения",
            name: "Language",
            readOnly: false
          },
          {
            type: "text",
            title: "К-во листов/экз/прил",
            name: "Np",
            readOnly: false
          },
          {
            type: "text",
            title: "Срок исполнения",
            name: "CtrlDate",
            readOnly: false
          }
        ]
      }
    ]
  }
];

export default inSchema;
