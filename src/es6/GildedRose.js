import NormalItem from './items/NormalItem';
import ConjuredItem from './items/ConjuredItem';
import AgedBrieItem from './items/AgedBrieItem';
import BackstagePassesItem from './items/BackstagePassesItem';
import SulfurasItem from './items/SulfurasItem';

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
            .map(config => this.itemClassFactory(config))
            .map(this.updateItemQuality);
    },

    /**
     * @param   {ItemConfig} config
     * @returns {SulfurasItem|AgedBrieItem|BackstagePassesItem|NormalItem}
     */
    itemClassFactory(config) {
        const ItemClass = this.getItemClassForItemName(config.name);
        return new ItemClass(config);
    },

    /**
     * @param   {String}    name
     * @returns {SulfurasItem|AgedBrieItem|BackstagePassesItem|NormalItem}
     */
    getItemClassForItemName(name) {
        const itemNameToItemClass = {
            'Sulfuras, Hand of Ragnaros': SulfurasItem,
            'Aged Brie': AgedBrieItem,
            'Backstage passes to a TAFKAL80ETC concert': BackstagePassesItem,
            'Conjured': ConjuredItem
        };
        return itemNameToItemClass[name] || NormalItem;
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
