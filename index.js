const env = require('dotenv').config();
const query = require('micro-query');
const { send } = require('micro');

const { fetchItem } = require('./lib/FetchItem');
const Item = require('./lib/Item');

const { storeItem } = require('./lib/GoogleDatastore');


module.exports = async (req, res) => {
  // Exit if malformed request
  const queryObject = query(req);
  if (!queryObject || !queryObject.itemId || !queryObject.itemBonuses) {
    const statusCode = 400;
    const data = { error: 'Query is malformed, please include both the itemId and itemBonuses in your querystring.' };

    send(res, statusCode, data);
    return;
  }

  // Get item
  const itemId = queryObject.itemId;
  const itemBonuses = queryObject.itemBonuses.split(',');
  const itemJSON = await fetchItem(itemId, itemBonuses);

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
    await storeItem(item, itemBonuses, item.weight() + item.effectValue());
  } catch (error) {
    console.error(error);
  }
};
