const { WeightCalculator } = require('./WeightCalculator');

const Item = itemJSON => {
  let state = {
    itemJSON,
  };

  return Object.assign(
    {},
    { itemLevel: state.itemJSON.Level },
    { itemID: state.itemJSON.ID },
    { itemName: state.itemJSON.Name },
    WeightCalculator(state)
  );
};

module.exports = Item;
