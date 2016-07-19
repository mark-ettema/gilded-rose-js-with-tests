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


function decreaseQualityByOne(item) {
    item.quality = item.quality - 1;
}
function increaseQualityByOne(item) {
    item.quality = item.quality + 1;
}
function decreaseSellInByOne(item) {
    item.sellIn = item.sellIn - 1;
}
function setQuality(item, value) {
    item.quality = value;
}
function isQualityGreaterThan(number, item) {
    return item.quality > number;
}
function isSellInLessThan(number, item) {
    return item.sellIn < number;
}
function isQualityZero(item) {
    return item.quality === 0;
}
function isQuality50(item) {
    return item.quality === 50;
}
function updateItemQuality(item) {
    item.update();
    return item;
}
const normalExtendedItem = {
    update: function() {
        decreaseSellInByOne(this);
        if (!isQualityGreaterThan(0, this)) {
            return;
        }
        decreaseQualityByOne(this);
        if (!isSellInLessThan(0, this)) {
            return;
        }
        if (isQualityZero(this)) {
            return;
        }
        decreaseQualityByOne(this);
    }
};

const sulfurasExtendedItem = {
    update: function() {}
};

const agedBrieExtendedItem = Object.assign({}, normalExtendedItem, {
    update: function() {
        decreaseSellInByOne(this);
        if (isSellInLessThan(0, this)) {
            return setQuality(this, 0);
        }
        if (isQuality50(this)) {
            return;
        }
        this.increaseQualityByOne();
        if (isSellInLessThan(6, this)) {
            this.increaseQualityByOne();
        }
        if (isSellInLessThan(11, this)) {
            this.increaseQualityByOne();
        }
    },
    increaseQualityByOne: function () {
        if (isQuality50(this)) {
            return;
        }
        increaseQualityByOne(this);
    }
});

const backstagePassesExtendedItem = Object.assign({}, normalExtendedItem, {
    update: function() {
        decreaseSellInByOne(this);
        if (isSellInLessThan(0, this)) {
            return setQuality(this, 0);
        }
        if (isQuality50(this)) {
            return;
        }
        this.increaseQualityByOne();
        if (isSellInLessThan(11, this)) {
            this.increaseQualityByOne();
        }
        if (isSellInLessThan(6, this)) {
            this.increaseQualityByOne();
        }
    },
    increaseQualityByOne: function () {
        if (isQuality50(this)) {
            return;
        }
        increaseQualityByOne(this);
    }
});

function extendItem(item) {
    const extendedItems = {
        [SULFURAS]: sulfurasExtendedItem,
        [AGED_BRIE]: agedBrieExtendedItem,
        [BACKSTAGE_PASSES]: backstagePassesExtendedItem
    };
    const extendedItem = extendedItems[item.name] || normalExtendedItem;
    return Object.assign(item, extendedItem);
}

GildedRose.updateQuality = function (items) {
    return items
        .map(extendItem)
        .map(updateItemQuality);
};
