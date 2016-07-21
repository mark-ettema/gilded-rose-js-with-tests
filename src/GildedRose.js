/**
 * @typedef     {Object}    ItemConfig
 * @property    {String}    name
 * @property    {Number}    sellIn
 * @property    {Number}    quality
 */

/**
 * @param   {Number}                number
 * @returns {Array.<undefined>}
 */
function createEmptyArray(number) {
    return new Array(number).fill(undefined);
}

class BaseItem {
    /**
     * @param {ItemConfig} config
     */
    constructor(config) {
        /**
         * @type {String}
         */
        this.name = config.name;

        /**
         * @type {Number}
         */
        this.sellIn = config.sellIn;

        /**
         * @type {Number}
         * @private
         */
        this._quality = config.quality;
    }

    /**
     * @returns {Number}
     */
    get quality() {
        return this._quality;
    }

    /**
     * @param {Number} value
     */
    set quality(value) {
        this._quality = value;
    }
}

class NormalItem extends BaseItem {
    /**
     * @param {ItemConfig} config
     */
    constructor(config) {
        super(config);

        /**
         * @const
         */
        this.minQuality = 0;
    }

    /**
     * @public
     */
    update() {
        this.sellIn -= 1;
        if (this.sellIn > 0) {
            return this.quality -= 1;
        }
        this.quality -= 2;
    }

    /**
     * @returns {Number}
     */
    get quality() {
        return this._quality;
    }

    /**
     * @param {Number} value
     */
    set quality(value) {
        if (value > this.minQuality) {
            return this._quality = value;
        }
        this._quality = this.minQuality;
    }
}

class ConjuredItem extends BaseItem {
    /**
     * @param {ItemConfig} config
     */
    constructor(config) {
        super(config);

        /**
         * @const
         */
        this.minQuality = 0;
    }

    /**
     * @public
     */
    update() {
        this.sellIn -= 1;
        if (this.sellIn > 0) {
            return this.quality -= 2;
        }
        this.quality -= 4;
    }

    /**
     * @returns {Number}
     */
    get quality() {
        return this._quality;
    }

    /**
     * @param {Number} value
     */
    set quality(value) {
        if (value > this.minQuality) {
            return this._quality = value;
        }
        this._quality = this.minQuality;
    }
}

class SulfurasItem extends BaseItem {
    /**
     * @public
     */
    update() {}
}

class AgedBrieItem extends BaseItem {
    /**
     * @param {ItemConfig} config
     */
    constructor(config) {
        super(config);

        /**
         * @const
         */
        this.maxQuality = 50;
    }

    /**
     * @public
     */
    update() {
        this.sellIn -= 1;
        if (this.sellIn < 0) {
            return this.quality = 0;
        }
        if (this.sellIn < 6) {
            return this.quality += 3;
        }
        if (this.sellIn < 11) {
            return this.quality += 2;
        }
        this.quality += 1;
    }

    /**
     * @returns {Number}
     */
    get quality() {
        return this._quality;
    }

    /**
     * @param {Number} value
     */
    set quality(value) {
        if (value < this.maxQuality) {
            return this._quality = value;
        }
        this._quality = this.maxQuality;
    }
}

class BackstagePassesItem extends BaseItem {
    /**
     * @param {ItemConfig} config
     */
    constructor(config) {
        super(config);

        /**
         * @const
         */
        this.maxQuality = 50;
    }

    /**
     * @public
     */
    update() {
        this.sellIn -= 1;
        if (this.sellIn < 0) {
            return this.quality = 0;
        }
        if (this.sellIn < 6) {
            return this.quality += 3;
        }
        if (this.sellIn < 11) {
            return this.quality += 2;
        }
        this.quality += 1;
    }

    /**
     * @returns {Number}
     */
    get quality() {
        return this._quality;
    }

    /**
     * @param {Number} value
     */
    set quality(value) {
        if (value < this.maxQuality) {
            return this._quality = value;
        }
        this._quality = this.maxQuality;
    }
}

const GildedRose = {
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
