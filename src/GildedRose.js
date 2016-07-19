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
function updateItemQuality(item) {
    if (!isAgedBrie(item) && !isBackstagePasses(item)) {
        if (item.quality > 0) {
            if (SULFURAS != item.name) {
                decreaseQualityByOne(item);
            }
        }
    } else {
        if (item.quality < 50) {
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
                    if (item.quality < 50) {
                        increaseQualityByOne(item);
                    }
                }
                //Increases the Quality of Backstage Passes if the Quality is 6 or less.
                if (item.sellIn < 6) {
                    if (item.quality < 50) {
                        increaseQualityByOne(item);
                    }
                }
            }
        }
    }
    if (SULFURAS != item.name) {
        decreaseSellInByOne(item);
    }
    if (item.sellIn < 0) {
        if (!isAgedBrie(item)) {
            if (!isBackstagePasses(item)) {
                if (item.quality > 0) {

                    if (!isSulfuras(item)) {
                        decreaseQualityByOne(item);
                    }
                }
            } else {
                setQuality(item, 0);
            }
        } else {
            if (item.quality < 50) {
                increaseQualityByOne(item);
            }
            if (isAgedBrie(item) && item.sellIn <= 0) {
                setQuality(item, 0);
            }
        }
    }
    if (!isSulfuras(item)) {
        if (item.quality > 50) {
            setQuality(item, 50);
        }
    }
    return item;
}
GildedRose.updateQuality = function (items) {
    return items.map(updateItemQuality);
};
