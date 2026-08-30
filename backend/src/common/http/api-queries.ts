export const buildIncludeQuery = (includeQuery: string[] = []) =>
  includeQuery?.reduce((acc, current) => ({ ...acc, [current]: true }), {});
