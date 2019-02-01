import { Colors } from '../sumTypes/Colors'; 

export default function pickRandomColor(): Colors {
  const colors = ["blue", "red", "green", "yellow"];
  let randomNumber = Math.floor(Math.random() * 4);
  return colors[randomNumber];
}