import React from "react";
import { Link } from "react-router-dom";

interface IViewSchema {
  "@alignment": number;
  "@category": boolean;
  "@columnNumber": number;
  "@field": boolean;
  "@hidden": boolean;
  "@name": string;
  "@response": boolean;
  "@title": string;
  "@twistie": boolean;
  "@width": number;
}

interface ViewProps {
  moduleId: string;
  data: [];
  schema: IViewSchema[];
}

class View extends React.Component<ViewProps> {
  getDb(item: any) {
    // /{dbpath}/api/data/documents/unid/{docUnid}
    if (!item["@link"]) {
      return "";
    }
    const dbName = item["@link"].href.split("/api/data/documents/unid/")[0];
    return dbName;
  }

  render() {
    const { moduleId, data, schema } = this.props;

    return (
      <div className="view">
        <div className="view__container">
          <table className="table table-sm">
            <tr>
              {schema.map((schemaItem: any) => {
                return (
                  !schemaItem["@hidden"] && <th>{schemaItem["@title"]}</th>
                );
              })}
            </tr>
            {data.map((dataItem: any) => (
              <tr>
                {schema.map((schemaItem: any) => {
                  return (
                    !schemaItem["@hidden"] && (
                      <td>
                        <Link
                          to={{
                            pathname: `/bd/${moduleId}/documents`,
                            search: `database=${this.getDb(
                              dataItem
                            )}&document=${dataItem["@unid"]}`
                          }}
                        >
                          {dataItem[schemaItem["@name"]]}
                        </Link>
                      </td>
                    )
                  );
                })}
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default View;
