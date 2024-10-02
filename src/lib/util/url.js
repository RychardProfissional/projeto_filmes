export const buildQueryParamsByFilters = (filters, quantity) => {
  let  params = "?";

  const filterArray = Array.isArray(filters) ? filters : [filters];
  filterArray.forEach(filter => {
    const { field, operation, value } = filter;

    params += `filter[${field}][operation]=${operation}&`
    if (typeof value === "object" && value !== null) {
      Object.keys(value).forEach(key => {
        params += `filter[${field}][value][${key}]=${value[key]}&`
      });
    } else {
      params += `filter[${field}][value]=${value}&`, value
    }
  });
  params += `quantity=${quantity}`

  return params;
};