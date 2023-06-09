export const getAdditionClassName = function (
  className: string,
  condition: boolean | undefined,
  addition: string = '--active'
) {
  return condition ? className.concat(' ', className + addition) : className;
};

export const getConcatClassName = function (
  className: string,
  potentialClassName: string = ''
) {
  const finalClassName = className.concat(' ', potentialClassName);

  return finalClassName;
};
