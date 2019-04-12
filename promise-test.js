//用来测试自己写的Promise实例
let Promise = require('./promise-A+.js');

// new Promise((resolve, reject) => {
//     // throw new Error('123');
//     resolve(100);
//     reject(200);

// }).then((result)=>{
//     console.log(1);
//     console.log(result);
//     return result;
// },() => {
//     console.log(2);
// }).then((result) => {
//     console.log(4);
//     console.log(result);
// }, () => {
//     console.log(5);
// })
// console.log(3);

let p1 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(100);
    }, 50);
})

let p2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(200);
    }, 10);
})

let p3 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(300);
    }, 100);
})

Promise.all([p1,p2,p3]).then(result=>{
    /** 
     * 实现效果：
     * 所有Promise都成功执行
     * result中分别存储每个实例返回的结果，而且和数组的顺序是一样的
    */

    console.log(result);
}).catch(reason=>{
    /** 
     * 实现效果：
     * 只要有一个失败，就执行catch
     * 失败后不再执行后面的操作
    */

    console.log('reason'+reason);
    
})