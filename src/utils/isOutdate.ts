export const isOutdate = function (date: Date | string | number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(date) < today;
};
