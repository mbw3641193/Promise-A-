//用来测试自己写的Promise实例
let Promise = require('./promise-A+.js');

new Promise((resolve, reject) => {
    // throw new Error('123');
    resolve(100);
    reject(200);

}).then(() => {
    console.log(1);
    return new Promise((resolve, reject) => {
        // throw new Error('123');
        reject(200);

    })
}, () => {
    console.log(2);
}).then(() => {
    console.log(4);
}, () => {
    console.log(5);
})
console.log(3);