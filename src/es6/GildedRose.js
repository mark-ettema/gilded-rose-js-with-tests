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
            .map(this.updateItemQuality);
    },

    /**
     * @param   {SulfurasItem|AgedBrieItem|BackstagePassesItem|NormalItem}  item
     * @returns {SulfurasItem|AgedBrieItem|BackstagePassesItem|NormalItem}
     */
    updateItemQuality(item) {
        item.update();
        return item;
    }
};
