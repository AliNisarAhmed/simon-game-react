export default function deepEqual(arr1: string[], arr2: string[]) : boolean {
  return arr1.every((elem, i) => elem === arr2[i]);
}