import React, { Component } from "react";
import GetFontAwesomeIcon from "./getFontAwesomeIcon";

class TableHeader extends Component {
  raiseSort = (column) => {
    if (!column.key) {
      const sortColumn = { ...this.props.sortColumn };
      if (sortColumn.path === column.path) {
        sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
      } else {
        sortColumn.path = column.path;
        sortColumn.order = "asc";
      }
      this.props.onSort(sortColumn);
    }
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path === sortColumn.path) {
      if (sortColumn.order === "asc")
        return <GetFontAwesomeIcon type="solid" icon="sort-asc" />;
      return <GetFontAwesomeIcon type="solid" icon="sort-desc" />;
    }
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              style={{ cursor: column.path ? "pointer" : "default" }}
              key={column.path || column.key}
              onClick={() => this.raiseSort(column)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
