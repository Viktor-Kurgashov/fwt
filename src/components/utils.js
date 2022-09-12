// хук для закрытия выпадающих селектов при клике за их пределами
// 
function useDropdownCloseListener (componentSelector, closingFunction) {
  const obj = {
    close: event => {
      if (!event.target.closest(componentSelector)) {
        closingFunction();
        obj.remove();
      }
    },
    add: () => {
      window.addEventListener('click', obj.close);
    },
    remove: () => {
      window.removeEventListener('click', obj.close);
    },
  };
  return obj;
}

export { useDropdownCloseListener };