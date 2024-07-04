import { PaginationState } from "@tanstack/table-core";
import { FilterParams, QueryParamsList, SortParams } from "./query-params-list";
import QueryBuilder from "./query-builder";
import { ComparisonOperators } from "./operators";

export default class UrlBuilder {
  private urlParams = "";
  private urlInitial: string;
  private encode: boolean;
  private queryParams: QueryParamsList;

  constructor(
    urlInitial: string,
    queryParams: QueryParamsList,
    encode?: boolean,
  ) {
    this.urlInitial = urlInitial;
    this.encode = encode ?? false;
    this.queryParams = queryParams;
  }

  public build(queryParams?: QueryParamsList): string {
    this.queryParams = queryParams ?? this.queryParams;
    this.urlParams = this.urlInitial;
    if (this.queryParams?.filter != null) {
      this.addFilters(this.queryParams?.filter);
    }
    if (this.queryParams?.sort != null) {
      this.addSorting(this.queryParams?.sort);
    }
    if (this.queryParams?.pagination != null) {
      this.addPagination(this.queryParams?.pagination);
    }
    return this.encode ? this.encoding() : this.urlParams;
  }

  private addFilters(filters: FilterParams[]) {
    if (filters.length > 0) {
      this.addNewCondition();
      const queryBuilder = new QueryBuilder(false);
      for (let i = 0; i < filters.length; i++) {
        const filter = filters[i];
        queryBuilder.createTempCondition(
          filter.propertyName,
          ComparisonOperators.Equals,
          filter.value,
        );
        if (i != filters.length - 1) {
          queryBuilder.and();
        }
      }
      this.urlParams += queryBuilder.build();
    }
  }

  private addSorting(sorts: SortParams[]) {
    if (sorts.length > 0) {
      this.addNewCondition();
      this.urlParams += "SortOrder=";
      for (let i = 0; i < sorts.length; i++) {
        const sort = sorts[i];
        if (sort.order == null) {
          sort.order = "ASC";
        }
        this.urlParams += `${sort.propertyName} ${sort.order}`;
        if (i != sorts.length - 1) {
          this.urlParams += ", ";
        }
      }
    }
  }

  private addPagination(pagination: PaginationState) {
    if (pagination != null) {
      this.addNewCondition();
      this.urlParams += `PageNumber=${pagination.pageIndex}`;
      this.addNewCondition();
      this.urlParams += `PageSize=${pagination.pageSize}`;
    }
  }

  private encoding(): string {
    this.urlParams = this.urlParams.trim();
    return encodeURIComponent(this.urlParams);
  }

  private addNewCondition() {
    if (this.urlParams == this.urlInitial) {
      this.urlParams += "?";
    } else {
      this.urlParams += "&";
    }
  }
}
