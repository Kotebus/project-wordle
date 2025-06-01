export const sample = <T>(arr: T[]):T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export function range(end:number) : number[];
export function range(start:number, end:number):number[];
export function range(start:number, end:number, step:number):number[]
export function range(start:number, end?:number, step = 1):number[] {
  const output:number[] = [];

  let e = end;
  let s = start;
  if (end === undefined) {
    e = start;
    s = 0;
  }

  for (let i = s; i < (e ?? start); i += step) {
    output.push(i);
  }

  return output;
}
