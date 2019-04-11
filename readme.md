# PROMISE A+

Promise是用来管理异步操作的，有三个状态

- pending(进行中)       当new Promise的时候就已经是pending状态了

- fulfilled(已成功)     成功和失败只能出现一个

- rejected(已失败)

new Promise会立即把回调函数执行，所以Promise本身可以理解为是同步的

```

new Promise((resolve,reject)=>{
    //resolve,reject是自己定义的，但是一般情况下约定俗成 成功执行resolve，失败执行reject
    //Excutor函数(执行函数)中 可以不管控异步操作（但是不管控异步没有意义）
    resolve(100);


}).then(result=>{
    console.log(1);
    //resolve执行的时候会触发第一个回调函数执行
    return 1000; 
    //会把这个值传递给下一个then中的方法，如果返回的是一个新的promise实例，则等到promise处理完成，再把结果传递给下一个then
},reason=>{
    console.log(2);
    //reject执行的时候会触发第二个回调函数执行
}).then(result=>{
    //需要保证上一个then方法返回的依然是promise实例,才能实现链式调用
    //上面的then管控的两个方法只要任何一个执行不报错，都会执行这个then中的第一个方法，如果执行报错，会执行then中的第二个回调函数
}).catch(reason=>{
    //catch 就相当于then(null,reason=>{});
})



console.log(3);


//output : 3  1  


//Promise.all  等待所有的Promise都成功执行then，反之只要有一个失败就执行catch
// Promise.all([promise1,...]).then;



```