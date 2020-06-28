export const rgbToHex = ([r, g, b]) =>
  `#${[r, g, b]
    .map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('')}`;

export default () => {
  const colors = [...Array(3)].map(
    () => Math.floor(Math.random() * 100) + 60,
  );
  return rgbToHex(colors);
};
