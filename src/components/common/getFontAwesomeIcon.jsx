import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

library.add(fab, far, fas);

const GetFontAwesomeIcon = ({ type, icon, onClick, style }) => (
  <FontAwesomeIcon
    icon={[
      type === "regular" ? "far" : type === "brands" ? "fab" : "fas",
      icon,
    ]}
    onClick={onClick}
    style={style}
  />
);

GetFontAwesomeIcon.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default GetFontAwesomeIcon;
