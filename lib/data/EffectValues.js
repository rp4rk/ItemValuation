const items = require('./ItemIds');
const stat = require('./StatKeys');
const weights = require('./Weights');

module.exports = {
  [items.TARNISHED_SENTINEL_MEDALLION]: ilvl => {
    const baseline = 930;
    const baselineValue = 5000 * weights[stat.INT];

    return baselineValue * Math.pow(1.15, (ilvl - baseline) / 15);
  },
};
