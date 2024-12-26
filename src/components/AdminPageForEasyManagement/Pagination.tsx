import React from "react";

const Pagination: React.FC = () => {
  return (
    <div className="pagination">
      <span>Rows per page: 10</span>
      <span>1-6 of 6</span>
      <button>{"<"}</button>
      <button>{">"}</button>
    </div>
  );
};

export default Pagination;
