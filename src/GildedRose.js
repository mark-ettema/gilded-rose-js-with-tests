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
    if (AGED_BRIE != item.name && BACKSTAGE_PASSES != item.name) {
        if (item.quality > 0) {
            if (SULFURAS != item.name) {
                item.quality = item.quality - 1;
            }
        }
    } else {
        if (item.quality < 50) {
            item.quality = item.quality + 1;
            if (AGED_BRIE == item.name) {
                if (item.sellIn < 6) {
                    item.quality = item.quality + 1;
                }
            }
            //Increases the Quality of the stinky cheese if its 11 days to due date.
            if (AGED_BRIE == item.name) {
                if (item.sellIn < 11) {
                    item.quality = item.quality + 1;
                }
            }
            if (BACKSTAGE_PASSES == item.name) {
                if (item.sellIn < 11) {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1;
                    }
                }
                //Increases the Quality of Backstage Passes if the Quality is 6 or less.
                if (item.sellIn < 6) {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1;
                    }
                }
            }
        }
    }
    if (SULFURAS != item.name) {
        item.sellIn = item.sellIn - 1;
    }
    if (item.sellIn < 0) {
        if (AGED_BRIE != item.name) {
            if (BACKSTAGE_PASSES != item.name) {
                if (item.quality > 0) {

                    if (SULFURAS != item.name) {
                        item.quality = item.quality - 1;
                    }
                }
            } else {
                item.quality = item.quality - item.quality;
            }
        } else {
            if (item.quality < 50) {
                item.quality = item.quality + 1;
            }
            if (AGED_BRIE == item.name && item.sellIn <= 0) {
                item.quality = 0;
            }
        }
    }
    if (SULFURAS != item.name) {
        if (item.quality > 50) item.quality = 50;
    }
    return item;
}
GildedRose.updateQuality = function (items) {
    return items.map(updateItemQuality);
};
