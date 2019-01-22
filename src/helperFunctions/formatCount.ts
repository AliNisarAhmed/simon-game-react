export default function formatCount(count: number): string {
  if (count < 10) {
    return `0${count}`;
  } else {
    return `${count}`;
  }
}