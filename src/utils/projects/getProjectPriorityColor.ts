export const getProjectPriorityColor = function (priority: number | string) {
  const value = +priority;
  if (value < 5) {
    return 'green';
  }
  if (value < 8) {
    return 'orange';
  }
  return 'red';
};
