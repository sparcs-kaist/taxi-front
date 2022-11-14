import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Picker.css";

class PickerColumn extends Component {
  static get propTypes() {
    return {
      options: PropTypes.array.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      itemHeight: PropTypes.number.isRequired,
      columnHeight: PropTypes.number.isRequired,
      onChange: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired,
      time: PropTypes.boolean,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      ...this.computeTranslate(props),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isMoving) {
      return;
    }
    this.setState(this.computeTranslate(nextProps));
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    const picker = document.getElementsByClassName("picker-column");
    if (!this.props.time && (event.keyCode === 38 || event.keyCode === 40)) {
      if (document.activeElement !== picker[0]) this.handleScroll(event);
      picker[0].focus();
    }
    if (this.props.time) {
      if (
        document.activeElement !== picker[1] &&
        (event.keyCode === 38 || event.keyCode === 40)
      )
        picker[0].focus();
      if (event.keyCode === 39 && document.activeElement === picker[0])
        picker[1].focus();
      if (event.keyCode === 37 && document.activeElement === picker[1])
        picker[0].focus();
    }
  };

  computeTranslate = (props) => {
    const { options, value, itemHeight, columnHeight } = props;
    let selectedIndex = options.indexOf(value);
    if (selectedIndex < 0) {
      // throw new ReferenceError();
      console.warn(
        'Warning: "' +
          this.props.name +
          '" doesn\'t contain an option of "' +
          value +
          '".'
      );
      this.onValueSelected(options[0]);
      selectedIndex = 0;
    }
    return {
      scrollerTranslate:
        columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight,
      minTranslate:
        columnHeight / 2 - itemHeight * options.length + itemHeight / 2,
      maxTranslate: columnHeight / 2 - itemHeight / 2,
    };
  };

  onValueSelected = (newValue) => {
    this.props.onChange(this.props.name, newValue);
  };

  handleTouchStart = (event) => {
    const startTouchY = event.targetTouches[0].pageY;
    this.setState(({ scrollerTranslate }) => ({
      startTouchY,
      startScrollerTranslate: scrollerTranslate,
    }));
  };

  safePreventDefault = (event) => {
    const passiveEvents = ["onTouchStart", "onTouchMove", "onWheel"];
    if (!passiveEvents.includes(event._reactName)) {
      event.preventDefault();
    }
  };

  handleTouchMove = (event) => {
    this.safePreventDefault(event);
    const touchY = event.targetTouches[0].pageY;
    this.setState(
      ({
        isMoving,
        startTouchY,
        startScrollerTranslate,
        minTranslate,
        maxTranslate,
      }) => {
        if (!isMoving) {
          return {
            isMoving: true,
          };
        }

        let nextScrollerTranslate =
          startScrollerTranslate + touchY - startTouchY;
        if (nextScrollerTranslate < minTranslate) {
          nextScrollerTranslate =
            minTranslate - Math.pow(minTranslate - nextScrollerTranslate, 0.8);
        } else if (nextScrollerTranslate > maxTranslate) {
          nextScrollerTranslate =
            maxTranslate + Math.pow(nextScrollerTranslate - maxTranslate, 0.8);
        }
        return {
          scrollerTranslate: nextScrollerTranslate,
        };
      }
    );
  };

  handleTouchEnd = () => {
    if (!this.state.isMoving) {
      return;
    }
    this.setState({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
    });
    setTimeout(() => {
      this.postMove();
    }, 0);
  };

  handleTouchCancel = () => {
    if (!this.state.isMoving) {
      return;
    }
    this.setState((startScrollerTranslate) => ({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      scrollerTranslate: startScrollerTranslate,
    }));
  };

  handleItemClick = (option) => {
    if (option !== this.props.value) {
      this.onValueSelected(option);
    } else {
      this.props.onClick(this.props.name, this.props.value);
    }
  };

  handleScroll = (event) => {
    let deltaY;
    const keyboard =
      !!event.keyCode && (event.keyCode == 38 || event.keyCode == 40);
    const isTouchPad = event.wheelDeltaY
      ? event.wheelDeltaY === -3 * event.deltaY
      : event.deltaMode === 0;

    if (keyboard) {
      deltaY = event.keyCode == 38 ? 35 : -35;
    } else if (event.deltaY) {
      deltaY = event.deltaY;
      document.getElementsByClassName("picker-column")[0].blur();
    } else {
      deltaY = 0;
    }
    this.setState(({ scrollerTranslate, minTranslate, maxTranslate }) => {
      const newValue =
        scrollerTranslate +
        (keyboard
          ? deltaY
          : (Math.abs(deltaY) < 10 ? 0 : deltaY) * (isTouchPad ? -1 : 1));
      const newTranslate = Math.max(
        minTranslate,
        Math.min(maxTranslate, newValue)
      );
      this.postWheel();
      return {
        scrollerTranslate: newTranslate,
        isScrolling: Date.now(),
      };
    });
  };

  postMove() {
    const { options, itemHeight } = this.props;
    const { scrollerTranslate, minTranslate, maxTranslate } = this.state;
    let activeIndex;
    if (scrollerTranslate > maxTranslate) {
      this.setState({ scrollerTranslate: maxTranslate });
      activeIndex = 0;
    } else if (scrollerTranslate < minTranslate) {
      this.setState({ scrollerTranslate: minTranslate });
      activeIndex = options.length - 1;
    } else {
      activeIndex = -Math.round(
        (scrollerTranslate - maxTranslate) / itemHeight
      );
    }
    this.onValueSelected(options[activeIndex]);
    this.setState(this.computeTranslate(this.props));
  }

  postWheel() {
    const that = this;
    setTimeout(() => {
      if (that.state.isScrolling > Date.now() - 250) {
        this.postWheel();
        return;
      }
      this.postMove();
    }, 150);
  }

  renderItems() {
    const { options, itemHeight, value } = this.props;
    return options.map((option, index) => {
      const style = {
        height: itemHeight + "px",
      };
      const className = `picker-item${
        option === value ? " picker-item-selected" : ""
      }`;
      return (
        <div
          key={index}
          className={className}
          style={style}
          onClick={() => this.handleItemClick(option)}
        >
          {option}
        </div>
      );
    });
  }

  render() {
    const { itemHeight } = this.props;
    const highlightStyle = {
      height: itemHeight - 6,
      marginTop: -((itemHeight - 6) / 2),
    };
    const translateString = `translate3d(0, ${this.state.scrollerTranslate}px, 0)`;
    const style = {
      MsTransform: translateString,
      MozTransform: translateString,
      OTransform: translateString,
      WebkitTransform: translateString,
      transform: translateString,
    };
    if (this.state.isMoving) {
      style.transitionDuration = "0ms";
    }
    return (
      <div
        className="picker-column"
        tabIndex={100}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchCancel}
        onWheel={this.handleScroll}
        onKeyDown={this.handleScroll}
      >
        <div className={`picker-scroller`} style={style}>
          {this.renderItems()}
        </div>
        <div className="picker-highlight" style={highlightStyle}></div>
      </div>
    );
  }
}

export default class Picker extends Component {
  static get propTypes() {
    return {
      optionGroups: PropTypes.object.isRequired,
      valueGroups: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired,
      onClick: PropTypes.func,
      itemHeight: PropTypes.number,
      height: PropTypes.number,
      time: PropTypes.boolean,
    };
  }

  static defaultProps = {
    onClick: () => {},
    itemHeight: 35,
    height: 221,
  };

  renderInner() {
    const {
      optionGroups,
      valueGroups,
      itemHeight,
      height,
      onChange,
      onClick,
      time,
    } = this.props;
    const columnNodes = [];
    for (let name in optionGroups) {
      columnNodes.push(
        <PickerColumn
          key={name}
          name={name}
          options={optionGroups[name]}
          value={valueGroups[name]}
          itemHeight={itemHeight}
          columnHeight={height}
          onChange={onChange}
          onClick={onClick}
          time={time}
        />
      );
    }
    return <div className="picker-inner">{columnNodes}</div>;
  }

  render() {
    const style = {
      height: this.props.height,
    };

    return (
      <div className="picker-container" style={style}>
        {this.renderInner()}
      </div>
    );
  }
}
