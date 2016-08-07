import NormalItem from './items/NormalItem';
import ConjuredItem from './items/ConjuredItem';
import AgedBrieItem from './items/AgedBrieItem';
import BackstagePassesItem from './items/BackstagePassesItem';
import SulfurasItem from './items/SulfurasItem';

export default {
    /**
     * @param   {ItemConfig} config
     * @returns {SulfurasItem|AgedBrieItem|BackstagePassesItem|NormalItem}
     */
    createItem(config) {
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
    }
};