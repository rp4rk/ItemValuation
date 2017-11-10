const fetcher = require('node-fetch');
const { getItem } = require('./GoogleDatastore');

// Construct a query URI for the WoWDB API
const constructWoWDBURI = (id, bonuses) =>
  `http://www.wowdb.com/api/item/${id}?bonusIDs=${bonuses.join()}`;

// Attempt to fetch a cached item
const getFromCache = async (itemId, itemBonuses, getItemDefault = getItem) => {
  try {
    const item = await getItemDefault(itemId, itemBonuses);

    if (item[0]) {
      console.log(`Item [ ${item[0].name} ( ${item[0].itemLevel} ) ] has been fetched from cache.`);
      return item;
    }
  } catch (error) {
    console.error(error);
  }
};

// Fetch the WoWDB API response for this item
// WoWDB Responses are non standard, and wrapped in brackets.
const fetchItem = async (itemId, itemBonuses, fetch = fetcher) => {
  const cachedResult = await getFromCache(itemId, itemBonuses);

  // We found a cached result!
  if (cachedResult) {
    return cachedResult;
  }

  const requestURI = constructWoWDBURI(itemId, itemBonuses);
  const response = await fetch(requestURI);
  const text = await response.text();

  // Return parsed json with aforementioned brackets
  return JSON.parse(text.slice(1, -1));
};

module.exports = {
  getFromCache,
  constructWoWDBURI,
  fetchItem,
};
