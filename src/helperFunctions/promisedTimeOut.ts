export default function timeout(time: number): Promise<number>  {
  return new Promise(resolve => setTimeout(resolve, time));
}