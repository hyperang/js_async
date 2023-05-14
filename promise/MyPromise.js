class MyPromise {
    static PENDING = 0
    static FULFILLED = 1
    static REJECTED = 2

    constructor(executor) {
        if (typeof executor !== 'function') {
            throw new TypeError('executor must be a function!')
        }

        this.status = MyPromise.PENDING
        this.value = null
        this.reason = null

        this.onFulfilledCallback = []
        this.onRejectedCallback = []

        try {
            // why here need to bind this?
            // when calling a function, it's this will point to global object as default
            // you have to call bind func to make it point to the class instance
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            // why here do not need to bind this?
            // call reject directly in constructor context, not call before created an instance 
            this.reject(error)
        }
    }

    resolve(value) {
        queueMicrotask(() => {
            if (this.status === MyPromise.PENDING) {
                this.status = MyPromise.FULFILLED
                this.value = value

                this.onFulfilledCallback.forEach((callback) => {
                    callback(value)
                });
            }
        })
    }

    reject(reason) {
        queueMicrotask(() => {
            if (this.status === MyPromise.PENDING) {
                this.status = MyPromise.REJECTED
                this.reason = reason

                this.onRejectedCallback.forEach((callback) => {
                    callback(reason)
                })
            }
        })
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : ()=>{}
        onRejected = typeof onRejected === 'function' ? onRejected : ()=>{}
        
        if (this.status === MyPromise.PENDING) {
            this.onFulfilledCallback.push(onFulfilled)
            this.onRejectedCallback.push(onRejected)
        }

        if (this.status === MyPromise.FULFILLED) {
            onFulfilled(this.value)
        }

        if (this.status === MyPromise.REJECTED) {
            onRejected(this.reason)
        }
    }
}

module.exports = MyPromise
