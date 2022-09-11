function getFetchState(state = 'loading') {
  const obj = {
    loading: false,
    error: false,
    empty: false,
    ok: false,
  };
  return {
    ...obj,
    [state]: true,
  }
}

export { getFetchState };