import { WindowMessenger, connect, debug } from "penpal";
import { ChildMethods, ParentMethods } from "../types/Methods.ts";

// @aivanov native logger
// window.addEventListener("message", (event) => {
//   if (event.data?.namespace !== 'penpal') return;
//   console.log("AAA [parent-received]", event.timeStamp.toFixed(2), event.origin, event.data);
// });

const iframe = document.createElement("iframe");
iframe.src = "iframe.html";
document.body.appendChild(iframe);

const onInit = async () => {
  // console.log('AAA parent.onInit @begin');

  const messenger = new WindowMessenger({
    remoteWindow: iframe.contentWindow!,
  });

  const methods: ParentMethods = {
    // add(num1: number, num2: number) {
    //   return num1 + num2;
    // },
    getParentApiVersion() {
      return 'parent@1.0'
    },
    onReady(status: boolean, message: string) {
      console.log('onReady()', status, message);
    }
  };

  const connection = connect<ChildMethods>({
    messenger,
    methods,
    timeout: 10000,
    // log: debug("parent"),
  });

  const remote = await connection.promise;
  console.log('AAA parent.onInit @end ✅', ',remote=', await remote.getChildApiVersion());

  // Calling a remote method will always return a promise.
  // const multiplicationResult = await remote.multiply(2, 6);
  // console.log(multiplicationResult); // 12
  // const divisionResult = await remote.divide(12, 4);
  // console.log(divisionResult); // 3
}

setTimeout(() => onInit(), 1000);
