const weights = require('./data/Weights');
const effectValuesDefault = require('./data/EffectValues');

const WeightCalculator = (state, effectValues=effectValuesDefault) => ({
  weight: () => {
    if (state.weight) {
      return state.weight;
    }

    const weight = state.itemJSON.Stats.reduce(
      (acc, stat) => (acc += weights[stat.StatID] * stat.Quantity),
      0
    );
    state.weight = weight;

    return state.weight;
  },
  effectValue: () => {
    if (state.effectValue) {
      return state.effectValue;
    }
    const itemLevel = state.itemJSON.Level;
    state.effectValue =
      (effectValues[state.itemJSON.ID] && effectValues[state.itemJSON.ID](itemLevel)) || 0;

    return state.effectValue;
  },
});

module.exports = {
  WeightCalculator,
};
