import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

class View extends React.Component<RouteComponentProps> {
  state = {
    query: "",
    html: "",
    json: []
  };

  ref: any;

  mounted: boolean = false;
  viewFormListener: any;
  unlisten: any;

  constructor(props: any) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    this.mounted = true;
    this.unlisten = this.props.history.listen((location: any, action: any) => {
      this.fetchView(location);
    });
    this.fetchView(this.props.history.location);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unlisten && this.unlisten();
    this.unlisten = null;
  }

  fetchView(location: any) {
    if (!this.mounted) {
      return;
    }

    console.log(this.props);

    const params = new URLSearchParams(location.search);
    const context = window.location.pathname.split("/")[1];
    const db = params.get("database");
    const view = params.get("view");

    fetch(`/XSmart/api/view${location.search}`).then(response => {
      response.json().then(r => {
        if (!this.mounted) {
          return;
        }
        console.log(r);
        this.setState({
          json: r
        });
      });
    });
  }

  // fetchView(location: any) {
  //   if (!this.mounted) {
  //     return;
  //   }

  //   console.log(this.props);

  //   const params = new URLSearchParams(location.search);
  //   const context = window.location.pathname.split("/")[1];
  //   fetch(`/XSmart/xpage/jsp/${params.get("v")}`).then(response => {
  //     response
  //       .text()
  //       .then(r => {
  //         if (!this.mounted) {
  //           return;
  //         }
  //         this.setState({
  //           html: r
  //         });
  //       })
  //       .then(() => {
  //         this.initListener();
  //       });
  //   });
  // }

  longestSubseq(s1: string, s2: string, res: string): string {
    let result: string[] = [];

    for (let i = 0; i < s1.length; i++) {
      const substr1 = s1.substring(0, i);
      let b = false;
      substr1.split("").map(ch => {
        if (!b && s2.includes(ch)) {
          console.log(substr1, ch);
          result.push(ch);
          b = true;
        }
      });
    }

    return result.join("");
  }

  initListener() {
    if (!this.mounted) {
      return;
    }
    //if (this.viewSelectFormListener) {
    // destroy listener
    //}

    const viewForm: any = this.ref.current.querySelector(
      "form[name=viewSelectForm]"
    );
    if (viewForm) {
      const listenerFn = (e: any): any => {
        e.preventDefault();
        console.log(e);

        const activeEl =
          (e && e.target) ||
          (e && e.currentTarget && e.currentTarget.activeElement) ||
          e;
        var elName = activeEl.name;
        var elValue = activeEl.value;
        const form = activeEl.form || e.target;

        if (elName.indexOf("_spage") !== -1) {
          elName = elName.substring(1);
        } else if (elName === "_page") {
          elName = "page";
        }

        const ellll = viewForm.querySelector("input[name=" + elName + "]");
        if (ellll) {
          ellll.value = elValue;
        } else {
          const el = document.createElement("input");
          el.name = elName;
          el.value = elValue;
          el.type = "hidden";
          viewForm.appendChild(el);
        }

        const vvvvvv = new FormData(form);
        vvvvvv.forEach((v, k) => {
          console.log(k, v);
        });

        const data = new URLSearchParams();
        let formData = new FormData();
        for (let i = 0; i < form.length; ++i) {
          if (
            form[i].type === "hidden" ||
            form[i].type === "text" ||
            form[i].type === "number"
          ) {
            let f = form[i];
            formData.append(f.name, f.value);
            data.append(f.name, f.value);
          }
        }

        // const data = new URLSearchParams(formData);

        fetch(form.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: data
        }).then(response => {
          response
            .text()
            .then(r => {
              if (!this.mounted) {
                return;
              }
              this.setState({
                html: r
              });
            })
            .then(() => {
              this.initListener();
            });
        });
      };
      //this.viewSelectFormListener = listenerFn;
      viewForm.addEventListener("submit", listenerFn);
      const els = viewForm.querySelectorAll("button");
      if (els) {
        els.forEach((_el: any) => _el.addEventListener("click", listenerFn));
      }
    }
  }

  render() {
    let params = new URLSearchParams(location.search);
    // this.setState({
    //   query: params.get("v")
    // });
    let strs: string[][] = [
      ["ABAZDC", "BACBAD", "ABAD"],
      ["AGGTAB", "GXTXAYB", "GTAB"],
      ["ABBA", "ABCABA", "ABBA"],
      ["aaaa", "aa", "aa"]
    ];

    return (
      <div className="view">
        <div className="view__container" ref={this.ref}>
          {/* view: {params.get("v")} */}
          <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
          {/* {strs.map(s12 => {
            return (
              <div key={s12[0]}>
                {this.longestSubseq(s12[0], s12[1], s12[2])}
              </div>
            );
          })} */}
          {(this.state.json || []).map((item: any) => (
            <div>{item.ViewTextRus}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(View);
