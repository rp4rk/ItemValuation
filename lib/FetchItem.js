const fetcher = require('node-fetch');
const { stripBonuses, stripId } = require('./URIParser');
const { getItem } = require('./GoogleDatastore');

// Construct a query URI for the WoWDB API
const constructWoWDBURI = (id, bonuses) =>
  `http://www.wowdb.com/api/item/${id}?bonusIDs=${bonuses.join()}`;


// Fetch the WoWDB API response for this item
// WoWDB Responses are non standard, and wrapped in brackets.
const fetchItem = async (uri, fetch = fetcher) => {
  try {
    const item = await getItem(stripId(uri), stripBonuses(uri));

    if (item[0]) {
      console.log(`Item [ ${item[0].name} ( ${item[0].itemLevel} ) ] has been fetched from cache.`);
      return item;
    }
  } catch (error) {
    console.error(error);
  }

  const response = await fetch(constructWoWDBURI(stripId(uri), stripBonuses(uri)));
  const text = await response.text();

  // Return parsed json with aforementioned brackets
  return JSON.parse(text.slice(1, -1));
};

module.exports = {
  constructWoWDBURI,
  fetchItem,
};
