function getFetchState(state = 'loading') {
  const fetchState = {
    loading: false,
    error: false,
    ok: false,
  };
  return {
    ...fetchState,
    [state]: true,
  }
}

function getDependiesLoaded(state, current) {
  for (let name in state) {
    if (name === 'dependiesLoaded') continue;
    if (!state[name].fetchState.ok && current !== name) return false;
  }
  return true;
}

export { getFetchState, getDependiesLoaded };