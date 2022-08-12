import { GameSession } from "../game-session.interface";

export interface AwardPointViewModel {
    correctChoice: boolean;
    session: GameSession;
}