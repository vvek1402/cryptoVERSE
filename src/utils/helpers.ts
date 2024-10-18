export const formatValueToUsd = (value: string) => {
  const numValue = parseFloat(value);

  if (isNaN(numValue)) return "0.00";

  if (numValue >= 1e12) {
    return `${(numValue / 1e12).toFixed(2)}T`;
  } else if (numValue >= 1e9) {
    return `${(numValue / 1e9).toFixed(2)}B`;
  } else if (numValue >= 1e6) {
    return `${(numValue / 1e6).toFixed(2)}M`;
  } else if (numValue >= 1e3) {
    return `${(numValue / 1e3).toFixed(2)}K`;
  } else if (numValue > 0) {
    return numValue.toFixed(2);
  } else {
    return "0.00";
  }
};

export const formatValueTwoDigit = (value: string) => {
  const numValue = parseFloat(value);

  if (isNaN(numValue)) return "0.00";

  return numValue.toFixed(2);
}

export const calculateDateRange = (range: string) => {
  const now = Date.now();
  let start;

  switch (range) {
    case "1w":
      start = now - 7 * 24 * 60 * 60 * 1000;
      break;
    case "1m":
      start = now - 30 * 24 * 60 * 60 * 1000;
      break;
    case "3m":
      start = now - 90 * 24 * 60 * 60 * 1000;
      break;
    case "6m":
      start = now - 180 * 24 * 60 * 60 * 1000;
      break;
    case "1y":
      start = now - 365 * 24 * 60 * 60 * 1000;
      break;
    default:
      start = now - 365 * 24 * 60 * 60 * 1000;
      break;
  }

  return { now, start };
};
