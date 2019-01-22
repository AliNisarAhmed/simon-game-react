
export default function pickRandomColor(): string {
  const colors = ["blue", "red", "green", "yellow"];
  let randomNumber = Math.floor(Math.random() * 4);
  return colors[randomNumber];
}