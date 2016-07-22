import BaseItem from './BaseItem';
import { isLowerThan, isGreaterThan, isBetween } from '../utils/NumberUtils'

export default class AgedBrieItem extends BaseItem {
    /**
     * @param {ItemConfig} config
     */
    constructor(config) {
        super(config);

        /**
         * @const
         */
        this.maxQuality = 50;
    }

    onSellInChanged() {
        this.quality = new Map()
            .set(this.isSellInLowerThan0(), 0)
            .set(this.isSellInBetween0And6(), this.quality + 3)
            .set(this.isSellInBetween6And11(), this.quality + 2)
            .set(this.isSellInGreaterThan11(), this.quality + 1)
            .get(true);
    }

    /**
     * @returns {Boolean}
     */
    isSellInLowerThan0() {
        return isLowerThan(0, this.sellIn);
    }

    /**
     * @returns {Boolean}
     */
    isSellInBetween0And6() {
        return isBetween(0, 6, this.sellIn);
    }

    /**
     * @returns {Boolean}
     */
    isSellInBetween6And11() {
        return isBetween(6, 11, this.sellIn);
    }

    /**
     * @returns {Boolean}
     */
    isSellInGreaterThan11() {
        return isGreaterThan(11, this.sellIn);
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
        if (value < this.maxQuality) {
            return this._quality = value;
        }
        this._quality = this.maxQuality;
    }
}