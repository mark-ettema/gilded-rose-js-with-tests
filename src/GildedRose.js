const AGED_BRIE = "Aged Brie";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";

var GildedRose = function () {
    var items = [];
    items.push(new Item("+5 Dexterity Vest", 10, 20));
    items.push(new Item(AGED_BRIE, 2, 0));
    items.push(new Item("Elixir of the Mongoose", 5, 7));
    items.push(new Item(SULFURAS, 0, 80));
    items.push(new Item(BACKSTAGE_PASSES, 15, 20));
    items.push(new Item("Conjured Mana Cake", 3, 6));
    GildedRose.updateQuality(items);
};

function updateItemQuality(item) {
    item.update();
    return item;
}

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

function extendItem(item) {
    const extendedItems = {
        [SULFURAS]: sulfurasExtendedItem,
        [AGED_BRIE]: agedBrieExtendedItem,
        [BACKSTAGE_PASSES]: backstagePassesExtendedItem
    };
    const extendedItem = extendedItems[item.name] || normalExtendedItem;
    return Object.assign({}, item, extendedItem);
}

GildedRose.updateQuality = function (items) {
    return items
        .map(extendItem)
        .map(updateItemQuality);
};
