// функции для переключения параметров фильтра
// возвращают изменённый location.search
// далее в компоненте редирект на новый route

const toggleFilter = (search, param, value) => {
  search = new URLSearchParams(search);

  if (value) search.set(param, value);
  else search.delete(param);

  search.delete('_page');
  search.set('_page', '1');

  return search.toString();
};

// сброс обоих параметров в Range
const clearRange = (search) => {
  search = new URLSearchParams(search);

  search.delete('created_gte');
  search.delete('created_lte');

  search.delete('_page');
  search.set('_page', '1');

  return search.toString();
};

export { toggleFilter, clearRange };