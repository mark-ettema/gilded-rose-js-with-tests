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
function isAgedBrie(item) {
    return AGED_BRIE === item.name;
}
function isBackstagePasses(item) {
    return BACKSTAGE_PASSES === item.name;
}
function isSulfuras(item) {
    return SULFURAS === item.name;
}
function isQualityGreaterThan(number, item) {
    return item.quality > number;
}
function isQualityLessThan50(item) {
    return item.quality < 50;
}
function isSellInLessThan(number, item) {
    return item.sellIn < number;
}
function updateItemQuality(item) {
    item.onDayEnd();
    item.lowerSellInByOne();
    if (isSellInLessThan(0, item)) {
        item.onSellInLessThanZero();
    }
    item.setToMaxQualityIfHigher();
    return item;
}
const normalExtendedItem = {
    onDayEnd: function() {
        if (!isQualityGreaterThan(0, this)) {
            return;
        }
        decreaseQualityByOne(this);
    },
    lowerSellInByOne: function() {
        decreaseSellInByOne(this);
    },
    onSellInLessThanZero: function() {
        if (!isQualityGreaterThan(0, this)) {
            return;
        }
        decreaseQualityByOne(this);
    },
    setToMaxQualityIfHigher: function () {
        if (!isQualityGreaterThan(50, this)) {
            return;
        }
        setQuality(this, 50);
    }
};

const sulfurasExtendedItem = Object.assign({}, normalExtendedItem, {
    onDayEnd: function() {
        if (!isQualityLessThan50(this)) {
            return;
        }
        increaseQualityByOne(this);
    },
    lowerSellInByOne: function() {},
    onSellInLessThanZero: function() {},
    setToMaxQualityIfHigher: function () {}
});

const agedBrieExtendedItem = Object.assign({}, normalExtendedItem, {
    onDayEnd: function() {
        if (!isQualityLessThan50(this)) {
            return;
        }
        increaseQualityByOne(this);
        if (isSellInLessThan(6, this)) {
            increaseQualityByOne(this);
        }
        if (isSellInLessThan(11, this)) {
            increaseQualityByOne(this);
        }
    },
    onSellInLessThanZero: function() {
        setQuality(this, 0);
    }
});

const backstagePassesExtendedItem = Object.assign({}, normalExtendedItem, {
    onDayEnd: function() {
        if (!isQualityLessThan50(this)) {
            return;
        }
        increaseQualityByOne(this);
        if (isSellInLessThan(11, this)) {
            increaseQualityByOne(this);
        }
        if (isSellInLessThan(6, this)) {
            increaseQualityByOne(this);
        }
    },
    onSellInLessThanZero: function() {
        setQuality(this, 0);
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
