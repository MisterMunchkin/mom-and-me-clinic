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

export const getIndexByName = (list: any[], column: string, name?: string) => {
  if (!name) {
    return 0;
  }
  var index = list?.findIndex(el => el[column] === name);
  if (index === -1) {
    return 0;
  }
  return index;
}

export const getEnumKeyByValue = <T extends string>(enumObj: Record<string, T>, value: T): keyof typeof enumObj | undefined => {
  return Object.keys(enumObj).find(key => enumObj[key] === value);
}

export const getEnumByValue = <T extends string, U extends { [key: string]: T }>(enumObj: U, value: T): U[keyof U] | undefined => {
  const keys = Object.keys(enumObj) as Array<keyof U>;
  const enumMember = keys.find(key => enumObj[key] === value);
  return enumMember ? enumObj[enumMember] : undefined;
}