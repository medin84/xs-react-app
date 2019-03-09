import React from "react";

interface Props {
  trigger?: "HOVER" | "CLICK" | "TOGGLE";
  isOpenClassName?: string;
  className?: string;
  children?: React.ReactNode;
  toggle?: string;
  content?: string;
  mouseLeaveCloseTime?: number;
  onOpen?: () => void;
  onClose?: () => void;
}

interface PositionState {
  isLeft: boolean;
  isTop: boolean;
}

interface State extends PositionState {
  isOpen: boolean;
  isFocused: boolean;
}

const DEFAULT_PROPS = {
  trigger: "HOVER",
  isOpenClassName: "open",
  toggle: ".dropdown-toggle",
  content: ".dropdown-menu",
  mouseLeaveCloseTime: 300,
  posXDimension: 2,
  posYDimension: 3
};

const IS_TOUCH =
  "ontouchstart" in window ||
  (window["DocumentTouch"] && document instanceof window["DocumentTouch"]);
let mouseOutId: string;
let isMouseEnter = false;

function genId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getClassNames(props: Props, state: State): string {
  return (
    "dropdown " +
    (props.className || "") +
    " " +
    (state.isOpen
      ? props.isOpenClassName || DEFAULT_PROPS.isOpenClassName
      : "") +
    (state.isFocused ? " focus" : "") +
    (state.isLeft ? " to-left" : "") +
    (state.isTop ? " to-top" : "")
  );
}

function getContentPosition(el: HTMLDivElement | null): PositionState {
  if (!el) {
    return {
      isLeft: false,
      isTop: false
    };
  }

  const body = window.document.body,
    clientRect = el.getBoundingClientRect(),
    screenHeightPart = body.clientHeight / DEFAULT_PROPS.posYDimension,
    screenWidthPart = body.clientWidth / DEFAULT_PROPS.posXDimension;

  return {
    isLeft: screenWidthPart < clientRect.left,
    isTop: screenHeightPart < clientRect.top
  };
}

class Dropdown extends React.PureComponent<Props, State> {
  documentClickListener: any;
  documentKeyupListener: any;
  clickEventListeners: {
    element: Element;
    fn: EventListenerOrEventListenerObject;
  }[] = [];

  ref: React.RefObject<HTMLDivElement>;

  id: string;
  selfClick = false;

  isOpenByClick = false;
  isMouseHoverTrigger = false;
  timeout: any;
  timeout2: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
      isFocused: false,
      isLeft: false,
      isTop: false
    };

    this.ref = React.createRef();
    this.id = genId();
    this.isMouseHoverTrigger =
      !IS_TOUCH && (props.trigger || DEFAULT_PROPS.trigger) === "HOVER";

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    this.initWindowListener();
    this.initClickListener();
  }

  componentWillUnmount() {
    this.removeWindowListener();
    this.removeClickListener();
  }

  initWindowListener() {
    this.documentClickListener = (event: MouseEvent) => {
      if (!this.selfClick) {
        this.setClose();
      } else {
        this.selfClick = false;
      }
    };
    this.documentKeyupListener = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        this.setClose();
      }
    };
    window.addEventListener("click", this.documentClickListener);
    window.addEventListener("keyup", this.documentKeyupListener);
  }

  removeWindowListener() {
    if (this.documentClickListener) {
      window.removeEventListener("click", this.documentClickListener);
      this.documentClickListener = null;
    }
    if (this.documentKeyupListener) {
      window.removeEventListener("keyup", this.documentKeyupListener);
      this.documentKeyupListener = null;
    }
  }

  initClickListener() {
    const el = this.ref.current;
    if (el) {
      const toggleSelector = this.props.toggle || DEFAULT_PROPS.toggle,
        toggleElement = el.querySelector(toggleSelector);
      if (toggleElement) {
        const toggleEventListener = {
          element: toggleElement,
          fn: (e: Event) => {
            e.preventDefault();
            this.handleClick({ isToggle: true });
          }
        };
        toggleElement.addEventListener("click", toggleEventListener.fn);
        this.clickEventListeners.push(toggleEventListener);
      }

      const contentSelector = this.props.content || DEFAULT_PROPS.content,
        contentElement = el.querySelector(contentSelector);
      if (contentElement) {
        const contentEventListener = {
          element: contentElement,
          fn: (e: Event) => {
            this.handleClick({ isContent: true });
          }
        };
        contentElement.addEventListener("click", contentEventListener.fn);
        this.clickEventListeners.push(contentEventListener);
      }
    }
  }

  removeClickListener() {
    this.clickEventListeners.map(item => {
      item.element.removeEventListener("click", item.fn);
    });
    this.clickEventListeners = [];
  }

  handleClick(props: { isToggle?: boolean; isContent?: boolean }) {
    if (!props.isContent && this.props.trigger === "HOVER") {
      return;
    }

    if (props.isToggle) {
      if (this.isOpenByClick) {
        this.setClose();
      } else {
        this.isOpenByClick = true;
        this.selfClick = true;
        this.setOpen();
      }
    } else if (this.props.trigger !== "TOGGLE") {
      this.setClose();
    }
  }

  handleMouseEnter() {
    if (this.isOpenByClick) {
      return;
    }

    if (this.isMouseHoverTrigger) {
      isMouseEnter = true;
      this.setOpen();
      if (this.id === mouseOutId) {
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
      }
    }
  }

  handleMouseLeave() {
    if (this.isOpenByClick) {
      return;
    }

    if (this.isMouseHoverTrigger) {
      isMouseEnter = false;
      mouseOutId = this.id;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (isMouseEnter) {
          this.setClose();
        } else {
          let time = this.props.mouseLeaveCloseTime;
          if (typeof time !== "number") {
            time = DEFAULT_PROPS.mouseLeaveCloseTime;
          }
          this.timeout2 = setTimeout(() => {
            this.setClose();
          }, time);
        }
      }, 1);
    }
  }

  handleKeyUp(keyCode: any) {
    console.log(keyCode);
  }

  handleBlur() {
    if (IS_TOUCH && this.isOpenByClick) {
      this.setClose();
    }
  }

  setOpen() {
    this.setState({ isOpen: true, ...getContentPosition(this.ref.current) });
    this.props.onOpen && this.props.onOpen();
  }

  setClose() {
    this.isOpenByClick = false;
    this.setState({ isOpen: false });
    this.props.onClose && this.props.onClose();
  }

  render() {
    return (
      <div
        // tabIndex={0}
        ref={this.ref}
        className={getClassNames(this.props, this.state)}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
        onClick={() => (this.selfClick = true)}
        // onFocus={() => (this.focused = true)}
        // onBlur={() => this.handleBlur()}
      >
        {this.props.children}
      </div>
    );
  }
}

export { Dropdown };
