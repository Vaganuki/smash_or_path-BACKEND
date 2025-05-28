export interface Db{
    sequelize: Sequelize;
    player: ModelStatic<Player>;
    banana: ModelStatic<Banana>;
    champion: ModelStatic<Champion>;
    skin: ModelStatic<Skin>;
    fight: ModelStatic<Fight>;
    tournament: ModelStatic<Tournament>;
    history: ModelStatic<History>;
    tournament_history: ModelStatic<TournamentHistory>;
    prefers: ModelStatic<Prefers>;
    eats: ModelStatic<Eats>;
    plays: ModelStatic<Plays>;
    participates: ModelStatic<Participates>;
}
export interface Champion extends Model<InferAttributes<Champion>, InferCreationAttributes<Champion>> {
    champion_id: CreationOptional<number>;
    name: string;
}
export interface Banana extends Model<InferAttributes<Banana>, InferCreationAttributes<Banana>> {
    banana_id: CreationOptional<number>;
    brand: string;
}
export interface Player extends Model<InferAttributes<Player>, InferCreationAttributes<Player>> {
    player_id: CreationOptional<number>;
    email: string;
    pseudo: string;
    password: string;
    elo: string;
    tournament_won: number;
    favorite_champion_id: ForeignKey<Champion["champion_id"]>;
    hated_champion_id: ForeignKey<Champion["champion_id"]>;
    is_active: boolean;
}
export interface Skin extends Model<InferAttributes<Skin>, InferCreationAttributes<Skin>> {
    skin_id: CreationOptional<number>;
    champion_id: ForeignKey<Champion["champion_id"]>;
    image_url: string;
}
export interface Fight extends Model<InferAttributes<Fight>, InferCreationAttributes<Fight>> {
    fight_id: CreationOptional<number>;
    player1_id: ForeignKey<Player["player_id"]>;
    player2_id: ForeignKey<Player["player_id"]>;
    champion_p1_id: ForeignKey<Champion["champion_id"]>;
    champion_p2_id: ForeignKey<Champion["champion_id"]>;
    score_p1: number;
    score_p2: number;
    winner_player_id: ForeignKey<Player["player_id"]>;
}
export interface Tournament extends Model<InferAttributes<Tournament>, InferCreationAttributes<Tournament>> {
    tournament_id: CreationOptional<number>;
    winner_tournament_player_id: ForeignKey<Player["player_id"]>;
    first_place_player_id: ForeignKey<Player["player_id"]>;
    second_place_player_id: ForeignKey<Player["player_id"]>;
    third_place_player_id: ForeignKey<Player["player_id"]>;
    first_place_reward: number;
    second_place_reward: number;
    third_place_reward: number;
    fight_id: ForeignKey<Fight["fight_id"]>;
}
export interface History extends Model<InferAttributes<History>, InferCreationAttributes<History>> {
    history_id: CreationOptional<number>;
    fight_id: ForeignKey<Fight["fight_id"]>;
}
export interface TournamentHistory extends Model<InferAttributes<TournamentHistory>, InferCreationAttributes<TournamentHistory>> {
    tournament_history_id: CreationOptional<number>;
    tournament_id: ForeignKey<Tournament["tournament_id"]>;
}
export interface Prefers extends Model<InferAttributes<Prefers>, InferCreationAttributes<Prefers>> {
    player_id: ForeignKey<Player["player_id"]>;
    champion_id: ForeignKey<Champion["champion_id"]>;
}
export interface Eats extends Model<InferAttributes<Eats>, InferCreationAttributes<Eats>> {
    player_id: ForeignKey<Player["player_id"]>;
    banana_id: ForeignKey<Banana["banana_id"]>;
}
export interface Plays extends Model<InferAttributes<Plays>, InferCreationAttributes<Plays>> {
    player_id: ForeignKey<Player["player_id"]>;
    fight_id: ForeignKey<Fight["fight_id"]>;
}
export interface Participates extends Model<InferAttributes<Participates>, InferCreationAttributes<Participates>> {
    player_id: ForeignKey<Player["player_id"]>;
    tournament_id: ForeignKey<Tournament["tournament_id"]>;
}
