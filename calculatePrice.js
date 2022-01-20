const calculatePrice = (date1) => {
  const d1 = date1.getTime();
  const d2 = new Date().getTime();

  return Math.floor((d2 - d1) / (24 * 3600 * 1000));
};

module.exports.calculatePrice = calculatePrice;
