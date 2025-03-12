import { Pagination } from "antd";
import { useState } from "react";
import "./Pagination.css";

export default function MoviePagination() {
  const [current, setCurrent] = useState(1);

  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };

  return (
    <>
      <Pagination
        current={current}
        onChange={onChange}
        align="center"
        defaultCurrent={1}
        total={50}
        className="pagination"
      />
    </>
  );
}
