const MyPromise = require('./MyPromise.js')

function loadImage(url) {
    return new Promise((resolve, reject) => {
        console.log('new Img file.')
        try {
            resolve(`load img from ${url} succeed.`) 
        } catch (error) {
            reject(`failed to load img from ${url}.`)
            throw new Error(error)
        }
        console.log('load program end.')
    })
}

const img = loadImage('img_url')
img.then((result)=>{console.log(result)}, (result)=>{console.log(result.message)})
// new Img file.
// load program end.
// load img from img_url succeed.

function loadImageMyPromise(url) {
    return new MyPromise((resolve, reject) => {
        console.log('new Img file using MyPromise.')
        try {
            resolve(`load img using MyPromise from ${url} succeed.`) 
        } catch (error) {
            reject(`failed to load img using MyPromise from ${url}.`)
            throw new Error(error)
        }
        console.log('load program using MyPromise end.')
    })
}

const img2 = loadImageMyPromise('img2_url')
img2.then((result)=>{console.log(result)}, (result)=>{console.log(result.message)})
