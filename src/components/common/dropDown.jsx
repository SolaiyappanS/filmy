import React from "react";
import PropTypes from "prop-types";

function DropDown({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedItem.name}
      </button>
      <ul className="dropdown-menu">
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            className="dropdown-item"
            style={{ cursor: "pointer" }}
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
}

DropDown.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

DropDown.propTypes = {
  items: PropTypes.array.isRequired,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  selectedItem: PropTypes.object.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

export default DropDown;
