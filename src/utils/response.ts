export function successResponse(
  message: string,
  statusCode: number = 200,
  data?: any
) {
  return {
    status: true,
    status_code: statusCode,
    message,
    ...(data !== undefined && { data }),
  };
}

export function successCreateResponse(data?: any) {
  return {
    status: true,
    status_code: 201,
    message: "Data Berhasil Ditambahkan",
    ...(data !== undefined && { data }),
  };
}

export function successUpdateResponse(data?: any) {
  return {
    status: true,
    status_code: 200,
    message: "Data Berhasil Diupdate",
    ...(data !== undefined && { data }),
  };
}

export function successDeleteResponse() {
  return {
    status: true,
    status_code: 200,
    message: "Data Berhasil Dihapus",
    data: null,
  };
}
export function successRestoreResponse() {
  return {
    status: true,
    status_code: 200,
    message: "Data Berhasil Direstore",
    data: null,
  };
}

export function errorResponse(
  message: string,
  statusCode: number = 400,
  errors?: any
) {
  return {
    status: false,
    status_code: statusCode,
    message,
    ...(errors !== undefined && { errors }),
  };
}
