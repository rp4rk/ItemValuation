// Strip bonus IDs from a WoWHead URI
const stripBonuses = uri => {
  const bonusMatcher = /bonus=([^&#]*)/;
  const bonuses = bonusMatcher.exec(uri);

  return bonuses && bonuses[1].split(':');
};

// Strip item ID from a WoWHead URI
const stripId = uri => {
  const idMatcher = /item=([^/#]*)/;
  const id = idMatcher.exec(uri);

  return id && id[1];
};

module.exports = {
  stripBonuses,
  stripId,
};
