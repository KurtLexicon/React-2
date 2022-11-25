/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { GenericListRows } from "./GenericListRows";
import "../styles/ListForm.css";

const asc = 1;
const desc = -1;

export function GenericList(props) {
  const { cols, itemList, onOpenDetail, onOpenAdd } = props;
  const [sortParams, setSortParams] = useState([
    { column: cols[0].name, order: asc },
  ]);

  // Set sort order

  function handleHeaderClick(colName) {
    const newSortParams = [...sortParams];
    const ix = newSortParams.findIndex((x) => x.column === colName);
    if (ix === 0) {
      newSortParams[0].order *= -1;
    } else {
      if (ix >= 0) newSortParams.splice(ix, 1);
      newSortParams.unshift({ column: colName, order: asc });
    }
    setSortParams(newSortParams);
  }

  // Sort the list according to sort order

  const sortedRows = [...itemList].sort((A, B) => {
    const compareValues = (a, b) => (a < b ? desc : a > b ? asc : 0);
    for (let i = 0; i < sortParams.length; i++) {
      const column = sortParams[i].column;
      const compare = compareValues(A[column], B[column]);
      if (compare) return compare * sortParams[i].order;
    }
    return 0;
  });

  const areItems = !!itemList && itemList.length > 0;
  return (
    <div className="genericList">
      <div className="buttonBox">
        <Button onClick={onOpenAdd}>Add New</Button>
      </div>

      {areItems && (
        <Container className="scrollarea">
          <GenericListRows
            cols={cols}
            items={sortedRows}
            onRowClick={onOpenDetail}
            onHeaderClick={handleHeaderClick}
          />
        </Container>
      )}

      {!areItems && (
        <Container>
          <h4>
            No rows found.
          </h4>
        </Container>
      )}
    </div>
  );
}
