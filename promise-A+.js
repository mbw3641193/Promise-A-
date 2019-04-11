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
        try{
            excutorCB(resolve, reject);
        }catch(err){
            //有异常信息就按照rejected状态处理
            reject(err);
        }

        // excutorCB(resolve, reject);
    }

    then(fulfilledCB,rejectedCB){
        this.fulfilledContainer.push(fulfilledCB);
        this.rejectedContainer.push(rejectedCB);
    }
}

module.exports = Promise;