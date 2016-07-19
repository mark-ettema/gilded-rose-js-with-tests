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
function isSellInLessOrEqualToZero(item) {
    return item.sellIn <= 0;
}
function updateItemQuality(item) {
    if (!isAgedBrie(item) && !isBackstagePasses(item) && !isSulfuras(item) && isQualityGreaterThan(0, item)) {
        decreaseQualityByOne(item);
    } else {
        if (isQualityLessThan50(item)) {
            increaseQualityByOne(item);
            if (isAgedBrie(item)) {
                if (isSellInLessThan(6, item)) {
                    increaseQualityByOne(item);
                }
                if (isSellInLessThan(11, item)) {
                    increaseQualityByOne(item);
                }
            }
            if (isBackstagePasses(item)) {
                if (isSellInLessThan(11, item) && isQualityLessThan50(item)) {
                    increaseQualityByOne(item);
                }
                if (isSellInLessThan(6, item) && isQualityLessThan50(item)) {
                    increaseQualityByOne(item);
                }
            }
        }
    }
    if (!isSulfuras(item)) {
        decreaseSellInByOne(item);
    }
    if (isSellInLessThan(0, item)) {
        if (!isAgedBrie(item)) {
            if (!isBackstagePasses(item) && !isSulfuras(item) && isQualityGreaterThan(0, item)) {
                decreaseQualityByOne(item);
            } else {
                setQuality(item, 0);
            }
        } else {
            if (isQualityLessThan50(item)) {
                increaseQualityByOne(item);
            }
            if (isAgedBrie(item) && isSellInLessOrEqualToZero(item)) {
                setQuality(item, 0);
            }
        }
    }
    if (!isSulfuras(item) && isQualityGreaterThan(50, item)) {
        setQuality(item, 50);
    }
    return item;
}
GildedRose.updateQuality = function (items) {
    return items.map(updateItemQuality);
};
