import { Dialect, Sequelize } from 'sequelize';
import { Db } from '../@types/types';

import championBuilder from './champion.model';
import bananaBuilder from './banana.model';
import playerBuilder from './player.model';
import skinBuilder from './skin.model';
import fightBuilder from './fight.model';
import tournamentBuilder from './tournament.model';
import historyBuilder from './history.model';
import tournamentHistoryBuilder from './tournament_history.model';
import prefersBuilder from './prefers.model';
import eatsBuilder from './eats.model';
import playsBuilder from './plays.model';
import participatesBuilder from './participates.model';

// 💾 Connexion Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PDW!,
    {
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT!,
        dialect: process.env.DB_DIALECT as Dialect,
        logging: false,
    }
);

// 🔨 Initialisation des modèles
const Champion = championBuilder(sequelize);
const Banana = bananaBuilder(sequelize);
const Player = playerBuilder(sequelize);
const Skin = skinBuilder(sequelize);
const Fight = fightBuilder(sequelize);
const Tournament = tournamentBuilder(sequelize);
const History = historyBuilder(sequelize);
const TournamentHistory = tournamentHistoryBuilder(sequelize);
const Prefers = prefersBuilder(sequelize);
const Eats = eatsBuilder(sequelize);
const Plays = playsBuilder(sequelize);
const Participates = participatesBuilder(sequelize);

// 🔗 Définition des relations

// Player -> Champion (favoris et détesté)
Player.belongsTo(Champion, { as: 'favoriteChampion', foreignKey: 'favorite_champion_id' });
Player.belongsTo(Champion, { as: 'hatedChampion', foreignKey: 'hated_champion_id' });

// Skin -> Champion
Skin.belongsTo(Champion, { foreignKey: 'champion_id' });
Champion.hasMany(Skin, { foreignKey: 'champion_id' });

// Fight -> Player
Fight.belongsTo(Player, { as: 'player1', foreignKey: 'player1_id' });
Fight.belongsTo(Player, { as: 'player2', foreignKey: 'player2_id' });
Fight.belongsTo(Player, { as: 'winner', foreignKey: 'winner_player_id' });

// Tournament -> Player
Tournament.belongsTo(Player, { as: 'winner', foreignKey: 'winner_tournament_player_id' });
Tournament.belongsTo(Player, { as: 'firstPlace', foreignKey: 'first_place' });
Tournament.belongsTo(Player, { as: 'secondPlace', foreignKey: 'second_place' });
Tournament.belongsTo(Player, { as: 'thirdPlace', foreignKey: 'third_place' });
Tournament.belongsTo(Fight, { foreignKey: 'fight_id' });

// History -> Fight
History.belongsTo(Fight, { foreignKey: 'fight_id' });
Fight.hasMany(History, { foreignKey: 'fight_id' });

// TournamentHistory -> Tournament
TournamentHistory.belongsTo(Tournament, { foreignKey: 'tournament_id' });
Tournament.hasMany(TournamentHistory, { foreignKey: 'tournament_id' });

// M:N - Player <-> Champion via Prefers
Player.belongsToMany(Champion, { through: Prefers, foreignKey: 'player_id', otherKey: 'champion_id' });
Champion.belongsToMany(Player, { through: Prefers, foreignKey: 'champion_id', otherKey: 'player_id' });

// M:N - Player <-> Banana via Eats
Player.belongsToMany(Banana, { through: Eats, foreignKey: 'player_id', otherKey: 'banana_id' });
Banana.belongsToMany(Player, { through: Eats, foreignKey: 'banana_id', otherKey: 'player_id' });

// M:N - Player <-> Fight via Plays
Player.belongsToMany(Fight, { through: Plays, foreignKey: 'player_id', otherKey: 'fight_id' });
Fight.belongsToMany(Player, { through: Plays, foreignKey: 'fight_id', otherKey: 'player_id' });

// M:N - Player <-> Tournament via Participates
Player.belongsToMany(Tournament, { through: Participates, foreignKey: 'player_id', otherKey: 'tournament_id' });
Tournament.belongsToMany(Player, { through: Participates, foreignKey: 'tournament_id', otherKey: 'player_id' });

// Export des modèles
const db: Db = {
    sequelize,
    Champion,
    Banana,
    Player,
    Skin,
    Fight,
    Tournament,
    History,
    TournamentHistory,
    Prefers,
    Eats,
    Plays,
    Participates,
};

export default db;
