export const truncateString = (str, length) => {
  return str?.length <= length ? str : str.substring(0, length - 3) + "...";
};
