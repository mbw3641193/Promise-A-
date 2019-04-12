//用来测试自己写的Promise实例
let Promise = require('./promise-A+.js');

new Promise((resolve, reject) => {
    // throw new Error('123');
    resolve(100);
    reject(200);

}).then((result)=>{
    console.log(1);
    console.log(result);
    return result;
},() => {
    console.log(2);
}).then((result) => {
    console.log(4);
    console.log(result);
}, () => {
    console.log(5);
})
console.log(3);