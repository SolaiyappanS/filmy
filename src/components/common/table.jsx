import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ items, columns, sortColumn, onSort }) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody items={items} columns={columns} />
      </table>
    </div>
  );
};

Table.propTypes = {
  items: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Table;
