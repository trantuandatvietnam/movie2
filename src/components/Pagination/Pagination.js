import Pagination from '@mui/material/Pagination';
import React from 'react';
import './Pagination.scss';

const PaginationCustom = ({ pageChange = null, totalPage, page }) => {
  const handleChange = (event, value) => {
    window.scroll(0, 0);
    pageChange(value);
  };

  return (
    <div style={{ padding: '24px 0' }}>
      {totalPage > 1 && (
        <Pagination
          page={page}
          onChange={handleChange}
          count={totalPage}
          color="primary"
        />
      )}
    </div>
  );
};

export default PaginationCustom;
