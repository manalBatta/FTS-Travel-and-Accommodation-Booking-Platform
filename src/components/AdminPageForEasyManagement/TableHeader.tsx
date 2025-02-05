import React, { memo } from "react";

const TableHeader: React.FC<{ headers: String[] }> = memo(({ headers }) => {
  return (
    <div className="table-header">
      {headers.map((head) => (
        <span>{head}</span>
      ))}
    </div>
  );
});

export default TableHeader;
