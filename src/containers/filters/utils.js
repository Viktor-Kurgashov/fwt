const toggleFilter = (search, param, value) => {
  search = new URLSearchParams(search);

  if (value) search.set(param, value);
  else search.delete(param);

  search.delete('_page');
  search.set('_page', '1');

  return search.toString();
};

const clearRange = (search) => {
  search = new URLSearchParams(search);

  search.delete('created_gte');
  search.delete('created_lte');

  search.delete('_page');
  search.set('_page', '1');

  return search.toString();
};

export { toggleFilter, clearRange };