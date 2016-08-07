import BaseItem from './BaseItem';

export default class ConjuredItem extends BaseItem {
    /**
     * @param {ItemConfig} config
     */
    constructor(config) {
        super(config);

        /**
         * @const
         */
        this.minQuality = 0;
    }

    onSellInChanged() {
        if (this.sellIn > 0) {
            return this.quality -= 2;
        }
        this.quality -= 4;
    }

    /**
     * @returns {Number}
     */
    get quality() {
        return this._quality;
    }

    /**
     * @param {Number} value
     */
    set quality(value) {
        this._quality = Math.max(value, this.minQuality);
    }
}