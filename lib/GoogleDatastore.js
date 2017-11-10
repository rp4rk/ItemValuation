const Datastore = require('@google-cloud/datastore');

const projectId = process.env.GOOGLE_APPLICATION_ID;

const datastore = Datastore({
  projectId,
});

const ITEM_KIND = 'item';

const generateKey = (kind, id, bonuses) => datastore.key([kind, `${id}_${bonuses.join('_')}`]);

// Store an item in the database
const storeItem = (item, bonuses, value) => {
  datastore.key([]);
  const sortedBonuses = bonuses.sort();
  const itemKey = generateKey(ITEM_KIND, item.itemID, sortedBonuses);

  const itemPayload = {
    key: itemKey,
    data: {
      value,
      itemLevel: item.itemLevel,
      name: item.itemName,
      hasEffect: item.hasEffect,
      effectExists: item.effectExists,
    },
  };

  return datastore.save(itemPayload);
};

// Fetch an item from the database
const getItem = (itemID, bonuses) => datastore.get(generateKey(ITEM_KIND, itemID, bonuses));

module.exports = {
  storeItem,
  getItem,
};
