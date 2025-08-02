export class ApiPaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;

  constructor(data: T[], page: number, limit: number, total: number, message?: string) {
    this.success = true;
    this.data = data;
    this.meta = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
    this.message = message;
  }
}

