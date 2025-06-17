export type ChildMethods = {
  multiply?: (num1: number, num2: number) => number;
  divide?: (num1: number, num2: number) => Promise<number>;
  getChildApiVersion: () => string;
};

export type ParentMethods = {
  add?: (num1: number, num2: number) => number;
  getParentApiVersion: () => string;
  onReady: (status: boolean, message: string) => void;
};
