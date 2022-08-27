import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

const Like = ({ liked, onClick }) => {
  return (
    <FontAwesomeIcon
      icon={liked ? filledHeart : emptyHeart}
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
