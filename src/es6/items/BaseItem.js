export default class BaseItem {
    /**
     * @param {ItemConfig} config
     */
    constructor(config) {
        /**
         * @type {String}
         */
        this.name = config.name;

        /**
         * @type {Number}
         */
        this._sellIn = config.sellIn;

        /**
         * @type {Number}
         * @private
         */
        this._quality = config.quality;
    }

    /**
     * @public
     */
    update() {
        this.sellIn -= 1;
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
        this._quality = value;
    }

    /**
     * @returns {Number}
     */
    get sellIn() {
        return this._sellIn;
    }

    /**
     * @param {Number} value
     */
    set sellIn(value) {
        this._sellIn = value;
        this.onSellInChanged();
    }

    onSellInChanged() {}
}
