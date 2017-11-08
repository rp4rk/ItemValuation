const { test } = require('ava');
const Item = require('../lib/Item');

let mockItem = null;

const ITEM_MOCK_JSON = () => ({
  Level: 1,
  ID: 1,
  Name: 'Test Baton',
});

test.beforeEach(t => {
  mockItem = Item(ITEM_MOCK_JSON());
});

test('Instantiates as expected', t => {
  t.truthy(mockItem.itemLevel);
  t.truthy(mockItem.itemID);
  t.truthy(mockItem.itemName);
  t.truthy(mockItem.weight);
  t.truthy(mockItem.effectValue);
});