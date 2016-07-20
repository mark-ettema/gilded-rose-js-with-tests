function createEmptyArray(number) {
    return new Array(number).fill(undefined);
}

const normalExtendedItem = {
    minQuality: 0,
    update() {
        this.sellIn -= 1;
        if (this.sellIn > 0) {
            return this.decreaseQuality(1);
        }
        this.decreaseQuality(2);
    },
    decreaseQuality(number) {
        createEmptyArray(number)
            .forEach(() => this.decreaseQualityByOne());
    },
    decreaseQualityByOne() {
        if (this.quality === this.minQuality) {
            return;
        }
        this.quality -= 1;
    }
};

const conjuredExtendedItem = {
    minQuality: 0,
    update() {
        this.sellIn -= 1;
        if (this.sellIn > 0) {
            return this.decreaseQuality(2);
        }
        this.decreaseQuality(4);
    },
    decreaseQuality(number) {
        createEmptyArray(number)
            .forEach(() => this.decreaseQualityByOne());
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
            return this.quality = 0;
        }
        if (this.sellIn < 6) {
            return this.increaseQuality(3);
        }
        if (this.sellIn < 11) {
            return this.increaseQuality(2);
        }
        this.increaseQuality(1);
    },
    increaseQuality(number) {
        createEmptyArray(number)
            .forEach(() => this.increaseQualityByOne());
    },
    increaseQualityByOne() {
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
            return this.quality = 0;
        }
        if (this.sellIn < 6) {
            return this.increaseQuality(3);
        }
        if (this.sellIn < 11) {
            return this.increaseQuality(2);
        }
        this.increaseQuality(1);
    },
    increaseQuality(number) {
        createEmptyArray(number)
            .forEach(() => this.increaseQualityByOne());
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
            'Backstage passes to a TAFKAL80ETC concert': backstagePassesExtendedItem,
            'Conjured': conjuredExtendedItem
        };
        const extendedItem = itemNameToExtendedItem[item.name] || normalExtendedItem;
        return Object.assign({}, item, extendedItem);
    },
    updateItemQuality(item) {
        item.update();
        return item;
    }
};
