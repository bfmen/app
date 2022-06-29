class Thread {
    constructor(fn) {
        const workerContext =
            "data:text/javascript," +
            encodeURIComponent(`'use strict';
  const __fn = (${fn});
  onmessage = (e) => postMessage(__fn(e.data));`);
        this.worker = new Worker(workerContext)
    }
    start(args) {
        return new Promise((resolve, reject) => {
            const worker = this.worker;
            worker.onmessage = (e) => {
                resolve(e.data);
            };
            worker.onerror = (e) => {
                reject(e.error);
            };
            worker.postMessage(args);
        }
        );
    }
    terminate() {
        this.worker.terminate()
    }
}
module.exports = Thread;


// await new Thread((res) => {
//     let a = 0
//     for (let index = 0; index < Number(res); index++) {
//         a += 1;
//     }
//     console.log(a)
//     return a + 'b'
// }).start('1000000000')
