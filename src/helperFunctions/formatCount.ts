export default function formatCount(count: number, gameState: string): string {
  if (count === 0 && gameState !== "Win") {
    return "- -";
  }
  if (gameState === "PlayerIsWrong") {
    return "! !";
  } 
  
  if (gameState === "Win") {
    return "\u{1F49D}";
  }
  
  if (count < 10) {
    return `0${count}`;
  } else {
    return `${count}`;
  }
}