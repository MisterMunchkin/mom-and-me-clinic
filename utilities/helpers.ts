export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const filterList = (searchString: string, list: any[], keys: string[]) => {
  var lowSearch = searchString.toLowerCase();
  return list.filter(el =>
    keys.some(key => 
      String(el[key]).toLowerCase().includes(lowSearch) 
    )
  );
}