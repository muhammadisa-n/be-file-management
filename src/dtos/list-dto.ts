export type listResponse = {
  data: any;
  total_data: number;
  paging: any;
};
export function tolistResponse(data: any): listResponse {
  return {
    data: data.data,
    total_data: data.total_data,
    paging: data.paging,
  };
}
