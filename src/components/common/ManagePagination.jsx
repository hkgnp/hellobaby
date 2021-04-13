import React, { useContext } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Context from '../../Context';

// Manages the pagination
export const ManagePagination = () => {
  const context = useContext(Context);

  // Destructure variables to calculate number of pages
  // const { pageSize, postsCount, managePageChange, currentPage } = context;

  const numberofServices = context.products().length;
  // Calculate number of pages
  const pagesCount = Math.ceil(numberofServices / context.pageSize());
  let numberofPagesArray = [];
  for (let i = 1; i < pagesCount + 1; i++) {
    numberofPagesArray.push(i);
  }

  // Sets number of pages and whether the active page is selected or not
  const renderPages = () => {
    return numberofPagesArray.map((p) => (
      <PaginationItem
        key={p}
        className={p === context.currentPage() ? 'active' : null}
      >
        <PaginationLink
          onClick={() => context.managePageChange(p)}
          style={{ borderColor: '#0e103d' }}
          className="mb-4"
        >
          {p}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return <Pagination aria-label="Page navigation">{renderPages()}</Pagination>;
};

// Manages which posts to display depending on which page is selected
export const Paginate = (posts, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  if (pageNumber === 1) {
    return posts.slice(startIndex, pageSize);
  } else {
    let endIndex = (startIndex / (pageNumber - 1)) * pageNumber;
    return posts.slice(startIndex, endIndex);
  }
};
