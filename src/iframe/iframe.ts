import { WindowMessenger, connect, debug } from "penpal";
import { ChildMethods, ParentMethods } from "../types/Methods.ts";

// @aivanov native logger
// window.addEventListener("message", (event) => {
//   if (event.data?.namespace !== 'penpal') return;
//   console.log("AAA [child-received]", event.timeStamp.toFixed(2), event.origin, event.data);
// });

const onInit = async () => {
  // console.log('AAA child.onInit @begin')

  const messenger = new WindowMessenger({
    remoteWindow: window.parent,
  });

  const methods: ChildMethods = {
    // multiply(num1: number, num2: number) {
    //   return num1 * num2;
    // },
    // divide(num1: number, num2: number) {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(num1 / num2);
    //     }, 1000);
    //   });
    // },
    getChildApiVersion() {
      return 'asqes-child@1.0'
    },
  };

  const connection = connect<ParentMethods>({
    messenger,
    methods,
    timeout: 10000,
    // log: debug("child"),
  });

  const remote = await connection.promise;
  console.log('✅ child.SYNCED', ',remote=', await remote.getParentApiVersion());

  // Some proof of work here

  setTimeout(async () => {
    // exit point
    await remote.onReady(true, 'Успех');
  }, 2000);

  // const additionResult = await remote.add(2, 6);
  // console.log(additionResult); // 8
}

setTimeout(() => onInit(), 1000);
