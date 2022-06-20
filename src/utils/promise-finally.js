export default (() => {
    if (typeof Promise.prototype.finally !== 'function') {
        const onfinally = function (callback) {
            let P = this.constructor;
            return this.then(
                value => P.resolve(callback()).then(() => value),
                reason => P.resolve(callback()).then(() => { throw reason })
            );
        };
        Object.defineProperty(
            Promise.prototype,
            'finally',
            {
                value: onfinally
            }
        );
    }
})();
