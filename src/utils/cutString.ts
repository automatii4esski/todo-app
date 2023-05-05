interface ICutStringReturn {
  stringSlice: string;
  isCutted: boolean;
}

export const cutString = function (
  str: string,
  limit: number
): ICutStringReturn {
  if (str.length <= limit) return { stringSlice: str, isCutted: false };

  const firstPart = str.slice(0, limit - 3) + '...';

  return { stringSlice: firstPart, isCutted: true };
};
