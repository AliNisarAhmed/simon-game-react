export default function isSubsetArr (arr: string[], mainArr: string[]): boolean {
  return arr.every((elem, i) => elem === mainArr[i]);   // Every element in arr is equal to the corresponding element in mainArr
}