interface ICutStringReturn {
  firstPart: string;
  secondPart: string | null;
}

export const cutString = function (
  str: string,
  limit: number
): ICutStringReturn {
  if (str.length <= limit) return { firstPart: str, secondPart: null };

  const firstPart = str.slice(0, limit - 3) + '...';
  const secondPart = str.slice(limit - 3);

  return { firstPart, secondPart };
};
