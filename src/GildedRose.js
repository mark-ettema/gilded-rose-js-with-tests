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
function updateItemQuality(item) {
    if (!isAgedBrie(item) && !isBackstagePasses(item)) {
        if (isQualityGreaterThan(0, item)) {
            if (!isSulfuras(item)) {
                decreaseQualityByOne(item);
            }
        }
    } else {
        if (isQualityLessThan50(item)) {
            increaseQualityByOne(item);
            if (isAgedBrie(item)) {
                if (item.sellIn < 6) {
                    increaseQualityByOne(item);
                }
            }
            //Increases the Quality of the stinky cheese if its 11 days to due date.
            if (isAgedBrie(item)) {
                if (item.sellIn < 11) {
                    increaseQualityByOne(item);
                }
            }
            if (isBackstagePasses(item)) {
                if (item.sellIn < 11) {
                    if (isQualityLessThan50(item)) {
                        increaseQualityByOne(item);
                    }
                }
                //Increases the Quality of Backstage Passes if the Quality is 6 or less.
                if (item.sellIn < 6) {
                    if (isQualityLessThan50(item)) {
                        increaseQualityByOne(item);
                    }
                }
            }
        }
    }
    if (!isSulfuras(item)) {
        decreaseSellInByOne(item);
    }
    if (item.sellIn < 0) {
        if (!isAgedBrie(item)) {
            if (!isBackstagePasses(item)) {
                if (isQualityGreaterThan(0, item)) {

                    if (!isSulfuras(item)) {
                        decreaseQualityByOne(item);
                    }
                }
            } else {
                setQuality(item, 0);
            }
        } else {
            if (isQualityLessThan50(item)) {
                increaseQualityByOne(item);
            }
            if (isAgedBrie(item) && item.sellIn <= 0) {
                setQuality(item, 0);
            }
        }
    }
    if (!isSulfuras(item)) {
        if (isQualityGreaterThan(50, item)) {
            setQuality(item, 50);
        }
    }
    return item;
}
GildedRose.updateQuality = function (items) {
    return items.map(updateItemQuality);
};
