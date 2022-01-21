import React, { Component } from "react";
import PropTypes from "prop-types";
// import cx from "classnames";

import { PLUGIN_LOGO_ICON_COMPONENTS } from "metabase/plugins";

class DefaultLogoIcon extends Component {
  static defaultProps = {
    height: 32,
  };
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    dark: PropTypes.bool,
  };

  render() {
    // const { dark, height, width } = this.props;
    return (
        <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2000 2000"
    style={{
      enableBackground: "new 0 0 2000 2000",
    }}
    xmlSpace="preserve"
   width={50}
  >
    <path
      d="m1541.58 1359.99-502.16 289.12a80.391 80.391 0 0 1-80.39-.1l-501.47-290.32c-24.86-14.39-40.14-40.95-40.11-69.67l.7-579.45A80.37 80.37 0 0 1 458.42 640l502.16-289.13a80.391 80.391 0 0 1 80.39.1l501.47 290.32a80.376 80.376 0 0 1 40.11 69.66l-.69 579.45c-.04 28.74-15.39 55.26-40.28 69.59"
      style={{
        fill: "#f26822",
      }}
    />
    <path
      d="m1439.8 1290.74-88.18 51.45a36.686 36.686 0 0 1-36.69.16l-88.52-50.58a36.702 36.702 0 0 1-18.49-31.81l-.44-374.11-82.85 47.91.58 512.45a36.682 36.682 0 0 1-18.2 31.73l-88.18 51.45a36.686 36.686 0 0 1-36.69.16l-88.52-50.58c-11.41-6.53-18.47-18.66-18.48-31.81l-.44-368.88-82.78 47.86.46 133.08a36.69 36.69 0 0 1-18.2 31.82l-87.72 51.16a36.686 36.686 0 0 1-36.69.16L561.64 1292a36.695 36.695 0 0 1-18.49-31.72l-.49-135.84a36.665 36.665 0 0 1 18.2-31.82l87.72-51.17c11.32-6.6 25.3-6.67 36.68-.17l85.68 48.93 103.72-59.97-.11-98.77a36.703 36.703 0 0 1 18.2-31.73l88.2-51.45c11.32-6.6 25.3-6.67 36.69-.16l86.51 49.44 103.3-59.74-.11-98.28a36.682 36.682 0 0 1 18.2-31.73l88.21-51.45c11.32-6.6 25.3-6.67 36.68-.17l86.09 49.19 2.44 1.39a36.684 36.684 0 0 1 18.47 31.81v2.73l.58 517.69a36.68 36.68 0 0 1-18.21 31.73"
      style={{
        fill: "#fff",
      }}
    />
  </svg>
    );
  }
}

export default function LogoIcon(props) {
  const [Component = DefaultLogoIcon] = PLUGIN_LOGO_ICON_COMPONENTS;
  return <Component {...props} />;
}
