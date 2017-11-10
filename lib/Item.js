const { WeightCalculator } = require('./WeightCalculator');
const ItemValues = require('./data/EffectValues');

// Ensures that the effect in the item JSON is accounted for in ItemValues registry
const spellInRegistry = itemJSON => !!ItemValues[itemJSON.ID];

// Item object
const Item = itemJSON => {
  let state = {
    itemJSON,
    hasEffect: itemJSON.Spells.length > 0, 
    effectExists: spellInRegistry(itemJSON),
  };

  return Object.assign(
    {},
    { itemLevel: state.itemJSON.Level },
    { itemID: state.itemJSON.ID },
    { itemName: state.itemJSON.Name },
    { hasEffect: state.hasEffect },
    { effectExists: state.effectExists },
    WeightCalculator(state)
  );
};

module.exports = Item;
