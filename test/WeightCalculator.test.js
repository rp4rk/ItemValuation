const { test } = require('ava');
const { WeightCalculator } = require('../lib/WeightCalculator');

const stat = require('../lib/data/StatKeys');
const weights = require('../lib/data/Weights');

const MOCK_STATE = () => ({
  itemJSON: {
    ID: 1,
    Level: 1,
    Stats: [
      {
        StatID: [stat.INT],
        Quantity: 100,
      },
    ],
  },
});

const MOCK_STATE_SET_VALUES = () =>
  Object.assign(
    {
      weight: 200 * weights[stat.INT],
      effectValue: 100,
    },
    MOCK_STATE()
  );

const MOCK_ITEM_VALUES = () => ({
  1: () => 300,
});

test('Weight is calculated correctly for statistics', t => {
  const mockWeightCalculator = WeightCalculator(MOCK_STATE());

  t.deepEqual(mockWeightCalculator.weight(), 100 * weights[stat.INT]);
});

test('Weight is cached properly in the state', t => {
  const mockWeightCalculator = WeightCalculator(MOCK_STATE_SET_VALUES());

  t.deepEqual(mockWeightCalculator.weight(), 200 * weights[stat.INT]);
});

test('Effect Values are properly calculated', t => {
  const mockWeightCalculator = WeightCalculator(MOCK_STATE(), MOCK_ITEM_VALUES());

  t.deepEqual(mockWeightCalculator.effectValue(), 300);
});
