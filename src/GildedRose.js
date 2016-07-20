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
        const itemNameToExtendedItem = {
            'Sulfuras, Hand of Ragnaros': sulfurasExtendedItem,
            'Aged Brie': agedBrieExtendedItem,
            'Backstage passes to a TAFKAL80ETC concert': backstagePassesExtendedItem
        };
        const extendedItem = itemNameToExtendedItem[item.name] || normalExtendedItem;
        return Object.assign({}, item, extendedItem);
    },
    updateItemQuality(item) {
        item.update();
        return item;
    }
};
