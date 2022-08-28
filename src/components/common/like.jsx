import React from "react";
import PropTypes from "prop-types";
import GetFontAwesomeIcon from "./getFontAwesomeIcon";

const Like = ({ liked, onClick }) => {
  return (
    <GetFontAwesomeIcon
      type={liked ? "solid" : "regular"}
      icon="heart"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    />
  );
};

Like.propTypes = {
  liked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Like;
