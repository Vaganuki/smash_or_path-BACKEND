import { Request, Response } from 'express';
import Player from '../config/models/player.model';   
import Fight from '../config/models/fight.model';     
import sequelize from '../config/database';         


export class EloController {
    private eloService: EloService;
    
    constructor() {
        this.eloService = new EloService();
        this.matchResult = this.matchResult.bind(this);
        this.calculateEloChange = this.calculateEloChange.bind(this);

    }
    

    public async calculateEloChange(winnerData: { id: number, elo: number }, loserData: { id: number, elo: number }, winnerStocksRemaining: number){
        let newWinnerElo:number;
        if (winnerStocksRemaining === 3) {
            newWinnerElo = 50;
        }
        else{
            newWinnerElo = winnerStocksRemaining * 10; 
        }
        if (winnerData.elo < loserData.elo){
            newWinnerElo += 0.1* (loserData.elo - winnerData.elo);
        }
        return {winnerEloChange: newWinnerElo, loserEloChange: -newWinnerElo};
    }

    public async matchResult(req: Request, res: Response): Promise<void> {
        const transaction = await sequelize.transaction(); 

        try {
            const {
                player1_id,
                player2_id,
                winner_player_id,
                score_p1, 
                score_p2  
            }: {
                player1_id: number,
                player2_id: number,
                winner_player_id: number,
                score_p1: number, 
                score_p2: number  
            } = req.body;

            // vérifications qu'il y ait bien 2 joueurs différents et qu'au moins l'un des deux gagne

            if (player1_id === player2_id) {
                await transaction.rollback();
                res.status(400).json({ message: "Player 1 and Player 2 cannot be the same." });
                return;
            }
            if (winner_player_id !== player1_id && winner_player_id !== player2_id) {
                await transaction.rollback();
                res.status(400).json({ message: "Winner must be either Player 1 or Player 2." });
                return;
            }

            // vérification que le nombre de stocks soit valide

            const validStockValues = [0, 1, 2, 3]; 
            if (!validStockValues.includes(score_p1) || !validStockValues.includes(score_p2)) {
                 await transaction.rollback();
                 res.status(400).json({ message: "Scores (stocks) for players must be between 0 and 3." });
                 return;
            }
            
            // cherche les joueurs en DB et renvoie une erreur 404 si l'un des deux n'est pas trouvé
            
            const player1 = await Player.findByPk(player1_id, { transaction });
            const player2 = await Player.findByPk(player2_id, { transaction });

            if (!player1 || !player2) {
                await transaction.rollback();
                res.status(404).json({ message: "One or both players not found." });
                return;
            }

            let winnerDB: Player, loserDB: Player;
            let winnerStocksRemaining: number;

            if (winner_player_id === player1.player_id) {
                winnerDB = player1;
                loserDB = player2;
                winnerStocksRemaining = score_p1; 
            } else {
                winnerDB = player2;
                loserDB = player1;
                winnerStocksRemaining = score_p2; 
            }

            if (winnerStocksRemaining < 1 || winnerStocksRemaining > 3) {
                await transaction.rollback();
                res.status(400).json({
                    message: "Invalid winner stocks remaining. Must be 1, 2, or 3 based on game rules for ELO calculation."
                });
                return;
            }

            const eloChanges = this.calculateEloChange({
                winnerData: { id: winnerDB.player_id, elo: winnerDB.elo },
                loserData: { id: loserDB.player_id, elo: loserDB.elo },
                winnerStocksRemaining: winnerStocksRemaining
            });


            let newWinnerElo = winnerDB.elo + eloChanges.winnerEloChange;
            let newLoserElo = loserDB.elo + eloChanges.loserEloChange; 

            newLoserElo = Math.max(-5, newLoserElo);

            winnerDB.elo = newWinnerElo;
            loserDB.elo = newLoserElo;

            await winnerDB.save({ transaction });
            await loserDB.save({ transaction });

            
            const newFight = await Fight.create({
                player1_id: player1.player_id, 
                player2_id: player2.player_id,
                score_p1, 
                score_p2, 
                winner_player_id: winnerDB.player_id, 
                
            }, { transaction });

            
            await transaction.commit();

            res.status(200).json({
                message: "Match result recorded and ELOs updated successfully.",
                fight_id: newFight.fight_id,
                winner: {
                    player_id: winnerDB.player_id,
                    pseudo: winnerDB.pseudo,
                    oldElo: winnerDB.elo - eloChanges.winnerEloChange, 
                    newElo: winnerDB.elo,
                    eloChange: eloChanges.winnerEloChange
                },
                loser: {
                    player_id: loserDB.player_id,
                    pseudo: loserDB.pseudo,
                    oldElo: loserDB.elo - eloChanges.loserEloChange, 
                    newElo: loserDB.elo,
                    eloChange: eloChanges.loserEloChange
                }
            });

        } catch (error) {
            
            if (transaction) await transaction.rollback();

            const errorMessage = error instanceof Error ? error.message : "Unknown server error.";
            console.error("Error reporting match result:", error);
            res.status(500).json({ message: "Server error while reporting match result.", error: errorMessage });
        }
    }
}