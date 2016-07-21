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

    get quality() {
        return this._quality;
    }

    set quality(value) {
        this._quality = value;
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
            return this.quality -= 1;
        }
        this.quality -= 2;
    }

    get quality() {
        return this._quality;
    }

    set quality(value) {
        if (value > this.minQuality) {
            return this._quality = value;
        }
        this._quality = this.minQuality;
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
            return this.quality -= 2;
        }
        this.quality -= 4;
    }

    get quality() {
        return this._quality;
    }

    set quality(value) {
        if (value > this.minQuality) {
            return this._quality = value;
        }
        this._quality = this.minQuality;
    }
}

class SulfurasItem extends BaseItem {
    update() {}
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
            return this.quality += 3;
        }
        if (this.sellIn < 11) {
            return this.quality += 2;
        }
        this.quality += 1;
    }

    get quality() {
        return this._quality;
    }

    set quality(value) {
        if (value < this.maxQuality) {
            return this._quality = value;
        }
        this._quality = this.maxQuality;
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
            return this.quality += 3;
        }
        if (this.sellIn < 11) {
            return this.quality += 2;
        }
        this.quality += 1;
    }

    get quality() {
        return this._quality;
    }

    set quality(value) {
        if (value < this.maxQuality) {
            return this._quality = value;
        }
        this._quality = this.maxQuality;
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
