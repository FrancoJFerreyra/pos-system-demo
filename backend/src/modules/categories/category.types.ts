export type CreateCategoryData = {
  name: string;
};

export type UpdateCategoryData = {
  name?: string;
};

export type GetAllCategoryQuery = {
  name?: string;
  include?: string[];
};

export type GetByIdCategoryQuery = {
  include?: string[];
};
