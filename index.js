const env = require('dotenv').config();
const query = require('micro-query');
const { send } = require('micro');

const { fetchItem } = require('./lib/FetchItem');
const { stripBonuses } = require('./lib/URIParser');
const Item = require('./lib/Item');

const { storeItem } = require('./lib/GoogleDatastore');


module.exports = async (req, res) => {
  // Exit if no item URI
  const queryObject = query(req);
  if (!queryObject || !queryObject.itemURI) {
    const statusCode = 400;
    const data = { error: 'Item URI not present in querystring' };

    send(res, statusCode, data);
    return;
  }

  // Get item
  const itemURI = decodeURIComponent(queryObject.itemURI);
  const itemJSON = await fetchItem(itemURI);

  // Item was cached!
  if (itemJSON[0]) {
    const statusCode = 200;
    const data = { value: itemJSON[0].value };

    send(res, statusCode, data);
    return;
  }

  // Item was not cached, instantiate one then store it for later.
  const item = Item(itemJSON);

  // Return the item value
  const statusCode = 200;
  const data = { value: item.weight() + item.effectValue() };
  send(res, statusCode, data);

  // Store item
  try {
    await storeItem(item, stripBonuses(itemURI), item.weight() + item.effectValue());
  } catch (error) {
    console.error(error);
  }
};
