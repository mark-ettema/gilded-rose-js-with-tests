const AGED_BRIE = "Aged Brie";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";

/*
 2006-30-84
 Leeroy was here!!

 Leeroy <lerooy@example.com>
 */
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


GildedRose.updateQuality = function (items) {
    for (var i = 0; i < items.length; i++) {
        if (AGED_BRIE != items[i].name && BACKSTAGE_PASSES != items[i].name) {
            //TODO: Improve this code.
            if (items[i].quality > 0) {
                if (SULFURAS != items[i].name) {
                    items[i].quality = items[i].quality - 1
                }
            }
        } else {
            if (items[i].quality < 50) {
                items[i].quality = items[i].quality + 1
                if (AGED_BRIE == items[i].name) {
                    if (items[i].sellIn < 6) {
                        items[i].quality = items[i].quality + 1
                    }
                }
                //Increases the Quality of the stinky cheese if its 11 days to due date.
                if (AGED_BRIE == items[i].name) {
                    if (items[i].sellIn < 11) {
                        items[i].quality = items[i].quality + 1
                    }
                }
                if (BACKSTAGE_PASSES== items[i].name) {
                    if (items[i].sellIn < 11) {
                        // See revision number 2394 on SVN.
                        if (items[i].quality < 50) {
                            items[i].quality = items[i].quality + 1
                        }
                    }
                    //Increases the Quality of Backstage Passes if the Quality is 6 or less.
                    if (items[i].sellIn < 6) {
                        if (items[i].quality < 50) {
                            items[i].quality = items[i].quality + 1
                        }
                    }
                }
            }
        }
        if (SULFURAS != items[i].name) {
            items[i].sellIn = items[i].sellIn - 1;
        }
        if (items[i].sellIn < 0) {
            if (AGED_BRIE != items[i].name) {
                if (BACKSTAGE_PASSES!= items[i].name) {
                    if (items[i].quality > 0) {
                        
                        if (SULFURAS != items[i].name) {
                            items[i].quality = items[i].quality - 1
                        }
                    }
                } else {
                    //TODO: Fix this.
                    items[i].quality = items[i].quality - items[i].quality
                }
            } else {
                if (items[i].quality < 50) {
                    items[i].quality = items[i].quality + 1
                }
                if (AGED_BRIE == items[i].name && items[i].sellIn <= 0)
                    items[i].quality = 0;
            } // of for.
        }
        if (SULFURAS != items[i].name)
            if (items[i].quality > 50) items[i].quality = 50;
    }
    return items;
};
