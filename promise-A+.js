//promise本质是个类
class Promise {
    constructor(excutorCB) {

        this.status = 'pending';
        this.value = undefined;
        this.fulfilledContainer = [];   //存成功要执行的方法
        this.rejectedContainer = [];    //存失败要执行的方法

        //执行excutorCB (增加异常捕获)
        //resolve   代表成功
        let resolve = (result) => {
            let timer = setTimeout(() => {  //加入定时器使方法变为异步，这样就可以在then执行之后再执行
                clearTimeout(timer); //销毁定时器
                if (this.status !== 'pending') return;
                this.status = 'fulfilled';
                this.value = result;
                this.fulfilledContainer.forEach(item => {
                    item(this.value);  //遍历then中的方法，并把result传给then
                })
            }, 0);

        };

        //reject   代表失败
        let reject = (reason) => {
            let timer = setTimeout(() => {  //加入定时器使方法变为异步，这样就可以在then执行之后再执行
                clearTimeout(timer); //销毁定时器
                if (this.status !== 'pending') return;
                this.status = 'rejected';
                this.value = reason;
                this.rejectedContainer.forEach(item => {
                    item(this.value);  //遍历then中的方法，并把reason传给then
                })
            }, 0);
        };

        //异常捕获
        try {
            excutorCB(resolve, reject);
        } catch (err) {
            //有异常信息就按照rejected状态处理
            reject(err);
        }

        // excutorCB(resolve, reject);
    }

    then(fulfilledCB, rejectedCB) {
        if( typeof fulfilledCB !== 'function' ){ //如果不传成功的回调
            fulfilledCB = result => result      //简写，相当于 result => { return result }
        }
        if( typeof rejectedCB !== 'function' ){ //如果不传错误的回调
            rejectedCB = reason => {
                throw new Error(reason.message);  //thorw不支持简写
            }
        }
        return new Promise((resolve, reject) => {  //实现then的链式写法
            this.fulfilledContainer.push((val) => {
                try {
                    let x = fulfilledCB(val);
                    // console.log(val === this.value);

                    if (x instanceof Promise) {   //检查x是不是Promise实例
                        x.then(resolve, reject); //如果是Promise的实例，那么Promise实例本身存在成功与失败，成功走resolve，失败走reject
                        return;
                    }
                    
                    resolve(x);                 //如果不是Promise实例，直接返回值就可以了，下个then直接就接收这个值，不存在失败
                } catch (err) {
                    reject(err);
                }

            });
            this.rejectedContainer.push((val) => {
                try {
                    let x = rejectedCB(val);

                    if (x instanceof Promise) {   //检查x是不是Promise实例
                        x.then(resolve, reject); //如果是Promise的实例，那么Promise实例本身存在成功与失败，成功走resolve，失败走reject
                        return;
                    }

                    resolve(x);                 //如果不是Promise实例，直接返回值就可以了，下个then直接就接收这个值，不存在失败
                } catch (err) {
                    reject(err);
                }
            });

        })

        // this.fulfilledContainer.push(fulfilledCB);
        // this.rejectedContainer.push(rejectedCB);
    }

    catch(rejectedCB){   //catch相当于then方法第一个参数不传，只穿第二个
        return this.then(null,rejectedCB);
    }
}

module.exports = Promise;