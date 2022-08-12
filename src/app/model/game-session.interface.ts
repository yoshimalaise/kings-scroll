export interface GameSession {
    isSinglePlayer: boolean;
    isFinished: boolean;
    targetGoal: number;
}

export interface SinglePlayerSession extends GameSession {
    playerName: string;
    score: string;
}

export interface CoopSession extends GameSession {
    participants: Participant[];
}

export interface Participant {
    name: string;
    score: number;
}