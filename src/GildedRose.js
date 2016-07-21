/**
 * @typedef     {Object}    Item
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
    constructor(item) {
        this.name = item.name;
        this.sellIn = item.sellIn;
        this._quality = item.quality;
    }
}

class NormalItem extends BaseItem {
    constructor(item) {
        super(item);

        /**
         * @const
         */
        this.minQuality = 0;
    }

    update() {
        this.sellIn -= 1;
        if (this.sellIn > 0) {
            return this.decreaseQuality(1);
        }
        this.decreaseQuality(2);
    }

    /**
     * @param {Number}  number
     */
    decreaseQuality(number) {
        createEmptyArray(number)
            .forEach(() => this.quality -= 1);
    }

    get quality() {
        return this._quality;
    }

    set quality(value) {
        if (this._quality === this.minQuality) {
            return;
        }
        this._quality = value;
    }
}

class ConjuredItem extends BaseItem {
    constructor(item) {
        super(item);

        /**
         * @const
         */
        this.minQuality = 0;
    }

    update() {
        this.sellIn -= 1;
        if (this.sellIn > 0) {
            return this.decreaseQuality(2);
        }
        this.decreaseQuality(4);
    }

    /**
     * @param {Number}  number
     */
    decreaseQuality(number) {
        createEmptyArray(number)
            .forEach(() => this.quality -= 1);
    }

    get quality() {
        return this._quality;
    }

    set quality(value) {
        if (this._quality === this.minQuality) {
            return;
        }
        this._quality = value;
    }
}

class SulfurasItem extends BaseItem {
    update() {}

    get quality() {
        return this._quality;
    }

    set quality(value) {
        this._quality = value;
    }
}

class AgedBrieItem extends BaseItem {
    constructor(item) {
        super(item);

        /**
         * @const
         */
        this.maxQuality = 50;
    }

    update() {
        this.sellIn -= 1;
        if (this.sellIn < 0) {
            return this.quality = 0;
        }
        if (this.sellIn < 6) {
            return this.increaseQuality(3);
        }
        if (this.sellIn < 11) {
            return this.increaseQuality(2);
        }
        this.increaseQuality(1);
    }

    /**
     * @param {Number}  number
     */
    increaseQuality(number) {
        createEmptyArray(number)
            .forEach(() => this.quality += 1);
    }

    get quality() {
        return this._quality;
    }

    set quality(value) {
        if (this._quality === this.maxQuality) {
            return;
        }
        this._quality = value;
    }
}

class BackstagePassesItem extends BaseItem {
    constructor(item) {
        super(item);

        /**
         * @const
         */
        this.maxQuality = 50;
    }

    update() {
        this.sellIn -= 1;
        if (this.sellIn < 0) {
            return this.quality = 0;
        }
        if (this.sellIn < 6) {
            return this.increaseQuality(3);
        }
        if (this.sellIn < 11) {
            return this.increaseQuality(2);
        }
        this.increaseQuality(1);
    }

    /**
     * @param {Number}  number
     */
    increaseQuality(number) {
        createEmptyArray(number)
            .forEach(() => this.quality += 1);
    }

    get quality() {
        return this._quality;
    }

    set quality(value) {
        if (this.quality === this.maxQuality) {
            return;
        }
        this._quality = value;
    }
}

const GildedRose = {
    /**
     * @param   {Array.<Item>}          items
     * @returns {Array.<SulfurasItem|AgedBrieItem|BackstagePassesItem|NormalItem>}
     */
    updateQuality(items) {
        return items
            .map(this.extendItem)
            .map(this.updateItemQuality);
    },

    /**
     * @param   {Item}          item
     * @returns {SulfurasItem|AgedBrieItem|BackstagePassesItem|NormalItem}
     */
    extendItem(item) {
        const itemNameToExtendedItem = {
            'Sulfuras, Hand of Ragnaros': SulfurasItem,
            'Aged Brie': AgedBrieItem,
            'Backstage passes to a TAFKAL80ETC concert': BackstagePassesItem,
            'Conjured': ConjuredItem
        };
        const ExtendedItem = itemNameToExtendedItem[item.name] || NormalItem;
        return new ExtendedItem(item);
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
