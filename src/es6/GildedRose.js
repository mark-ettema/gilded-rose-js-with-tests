import ItemFactory from './ItemFactory';

/**
 * @typedef     {Object}    ItemConfig
 * @property    {String}    name
 * @property    {Number}    sellIn
 * @property    {Number}    quality
 */

export default {
    /**
     * @param   {Array.<ItemConfig>}  itemConfigs
     * @returns {Array.<SulfurasItem|AgedBrieItem|BackstagePassesItem|NormalItem>}
     */
    updateQuality(itemConfigs) {
        return itemConfigs
            .map(config => ItemFactory.createItem(config))
            .map(item => (item.update(), item));
    }
};
