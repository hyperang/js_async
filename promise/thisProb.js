class MyClass {
    constructor(func) {
        this.func_1 = function() {
            console.log(this)
        }

        this.func_2 = () => {
            console.log(this)
        }

        try {
            func(this.func_1, this.func_2, this.myMethod, this.myBindMethod.bind(this))
        } catch (error) {
            throw new Error(error)
        }
    }

    myMethod() {
        console.log(this)
    }
    
    myBindMethod() {
        console.log(this)
    }
}

const mc = new MyClass((func_1, func_2, func_3, func_4) => {
    func_1() // undefined
    func_2() // MyClass { func1: [anonymous], func2: [anonymous] }
    func_3() // undefined
    // this.func_3() // Error: TypeError: this.func_3 is not a function
    // this.myMethod() // Error: TypeError: this.func_3 is not a function
    console.log(this) // {}
    func_4() // MyClass { func1: [anonymous], func2: [anonymous] }
})
