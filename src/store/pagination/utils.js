function createLinks(pathname, search, current, last) {
  search = new URLSearchParams(search);

  function link(pageNum) {
    search.set('_page', pageNum);
    return {
      route: pathname + search.toString(),
      title: pageNum.toString(),
    };
  }

  const result = {
    first: (current > 1) ? link(1) : null,
    prev: (current > 1) ? link(current - 1) : null,
    stack: [{ ...link(current), current: true }],
    next: (current < last) ? link(+current + 1) : null,
    last: (current < last) ? link(last) : null,
  };

  if (current > 1) result.stack.unshift(link(current - 1));
  if (current < last) result.stack.push(link(+current + 1));

  if (current === 1 && last > 2) result.stack.push(link(3));
  if (current === last && last > 2) result.stack.unshift(link(current - 2));

  return result;
}

export { createLinks };