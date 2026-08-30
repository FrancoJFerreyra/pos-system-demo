export type ApiRequestBody<T> = {
  data: T;
};

export type ApiDefaultParams = {
  id: string;
};

export type ApiRelationQuery = {
  include: string[];
};
