import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

const Like = (props) => {
  return (
    <FontAwesomeIcon
      icon={props.liked ? filledHeart : emptyHeart}
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
