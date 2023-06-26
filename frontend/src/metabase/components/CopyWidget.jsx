/* eslint-disable react/prop-types */
import React, { Component } from "react";
import cx from "classnames";
import { CopyWidgetButton } from "./CopyWidget.styled";

export default class CopyWidget extends Component {
  render() {
    const { value, onChange, style, ...props } = this.props;
    return (
      <div className="flex relative" style={{ ...style, marginBottom: 25, marginTop: 0 }}>
        <input
          className={cx("Form-input flex-full", { "no-focus": !onChange })}
          style={{
            paddingRight: 40,
            fontSize: 12.4,
          }}
          onClick={
            !onChange
              ? e => e.target.setSelectionRange(0, e.target.value.length)
              : null
          }
          value={value}
          onChange={onChange}
          {...props}
        />
        <CopyWidgetButton value={value} />
      </div>
    );
  }
}
