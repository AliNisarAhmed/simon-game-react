// export enum GameState {
//   Off,
//   AwaitingGameStart,
//   PlayingSequence,
//   AwaitingUserInput
// }

export type GameState = "Off" | "AwaitingGameStart" | "PlayingSequence" | "AwaitingUserInput" | "PlayerTurnUnderway" | "PlayerIsWrong" | "Win";