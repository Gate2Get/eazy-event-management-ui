const replaceUndefinedOrNull = (key: string, value: any) => {
  if (value === null || value === "") {
    return undefined;
  }

  return value;
};

export const removeEmptyProp = (obj: any) => {
  const strObj = JSON.stringify(obj, replaceUndefinedOrNull);
  const parsedObj = JSON.parse(strObj);
  return parsedObj;
};
