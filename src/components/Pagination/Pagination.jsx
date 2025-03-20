import { Pagination } from "antd";
import "./Pagination.css";

export default function MoviePagination({ onChange, currentPage, totalPages }) {
  return (
    <>
      <Pagination
        current={currentPage}
        onChange={(page) => {
          onChange(page);
        }}
        align="center"
        total={totalPages}
        pageSize={1}
        className="pagination"
      />
    </>
  );
}
