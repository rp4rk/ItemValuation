const { test } = require('ava');
const { constructWoWDBURI, getFromCache, fetchItem } = require('../lib/FetchItem');


test('Request URI construction', t => {
  const id = 1;
  const bonuses = [1, 2];
  const URI = constructWoWDBURI(id, bonuses);

  t.is(URI, 'http://www.wowdb.com/api/item/1?bonusIDs=1,2')
});