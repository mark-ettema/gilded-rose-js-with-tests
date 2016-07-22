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

function isLowerThan(max, number) {
    return number < max;
}

function isGreaterThan(min, number) {
    return number > min;
}

function isBetween(min, max, number) {
    return isGreaterThan(min, number ) && isLowerThan(max, number);
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
        this._sellIn = config.sellIn;

        /**
         * @type {Number}
         * @private
         */
        this._quality = config.quality;
    }

    /**
     * @public
     */
    update() {
        this.sellIn -= 1;
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

    /**
     * @returns {Number}
     */
    get sellIn() {
        return this._sellIn;
    }

    /**
     * @param {Number} value
     */
    set sellIn(value) {
        this._sellIn = value;
        this.onSellInChanged();
    }

    onSellInChanged() {}
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

    onSellInChanged() {
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

    onSellInChanged() {
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

    onSellInChanged() {
        this.quality = new Map()
            .set(this.isSellInLowerThan0(), 0)
            .set(this.isSellInBetween0And6(), this.quality + 3)
            .set(this.isSellInBetween6And11(), this.quality + 2)
            .set(this.isSellInGreaterThan11(), this.quality + 1)
            .get(true);
    }

    /**
     * @returns {Boolean}
     */
    isSellInLowerThan0() {
        return isLowerThan(0, this.sellIn);
    }

    /**
     * @returns {Boolean}
     */
    isSellInBetween0And6() {
        return isBetween(0, 6, this.sellIn);
    }

    /**
     * @returns {Boolean}
     */
    isSellInBetween6And11() {
        return isBetween(6, 11, this.sellIn);
    }

    /**
     * @returns {Boolean}
     */
    isSellInGreaterThan11() {
        return isGreaterThan(11, this.sellIn);
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

    onSellInChanged() {
        this.quality = new Map()
            .set(this.isSellInLowerThan0(), 0)
            .set(this.isSellInBetween0And6(), this.quality + 3)
            .set(this.isSellInBetween6And11(), this.quality + 2)
            .set(this.isSellInGreaterThan11(), this.quality + 1)
            .get(true);
    }

    /**
     * @returns {Boolean}
     */
    isSellInLowerThan0() {
        return isLowerThan(0, this.sellIn);
    }

    /**
     * @returns {Boolean}
     */
    isSellInBetween0And6() {
        return isBetween(0, 6, this.sellIn);
    }

    /**
     * @returns {Boolean}
     */
    isSellInBetween6And11() {
        return isBetween(6, 11, this.sellIn);
    }

    /**
     * @returns {Boolean}
     */
    isSellInGreaterThan11() {
        return isGreaterThan(11, this.sellIn);
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
