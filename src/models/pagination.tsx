export interface xPagination {
  totalCount: number;
  pageSize: number;
  currentPageSize: number;
  currentStartIndex: number;
  currentEndIndex: number;
  pageNumber: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
