import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";

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
        return <FontAwesomeIcon icon={faSortAsc} />;
      return <FontAwesomeIcon icon={faSortDesc} />;
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
