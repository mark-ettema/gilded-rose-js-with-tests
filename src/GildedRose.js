const AGED_BRIE = "Aged Brie";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";

const normalExtendedItem = {
    minQuality: 0,
    update() {
        this.sellIn -= 1;
        this.decreaseQualityByOne();
        if (this.sellIn > 0) {
            return;
        }
        this.decreaseQualityByOne();
    },
    decreaseQualityByOne() {
        if (this.quality === this.minQuality) {
            return;
        }
        this.quality -= 1;
    }
};

const sulfurasExtendedItem = {
    update() {}
};

const agedBrieExtendedItem = {
    maxQuality: 50,
    update() {
        this.sellIn -= 1;
        if (this.sellIn < 0) {
            this.quality = 0;
            return;
        }
        this.increaseQualityByOne();
        if (this.sellIn < 6) {
            this.increaseQualityByOne();
        }
        if (this.sellIn < 11) {
            this.increaseQualityByOne();
        }
    },
    increaseQualityByOne () {
        if (this.quality === this.maxQuality) {
            return;
        }
        this.quality += 1;
    }
};

const backstagePassesExtendedItem = {
    maxQuality: 50,
    update() {
        this.sellIn -= 1;
        if (this.sellIn < 0) {
            this.quality = 0;
            return;
        }
        this.increaseQualityByOne();
        if (this.sellIn < 6) {
            this.increaseQualityByOne();
        }
        if (this.sellIn < 11) {
            this.increaseQualityByOne();
        }
    },
    increaseQualityByOne() {
        if (this.quality === this.maxQuality) {
            return;
        }
        this.quality += 1;
    }
};

const GildedRose = {
    updateQuality(items) {
        return items
            .map(this.extendItem)
            .map(this.updateItemQuality);
    },
    extendItem(item) {
        const extendedItems = {
            [SULFURAS]: sulfurasExtendedItem,
            [AGED_BRIE]: agedBrieExtendedItem,
            [BACKSTAGE_PASSES]: backstagePassesExtendedItem
        };
        const extendedItem = extendedItems[item.name] || normalExtendedItem;
        return Object.assign({}, item, extendedItem);
    },
    updateItemQuality(item) {
        item.update();
        return item;
    }
};
