export interface UserState {
    points: number;
    dailyLogins: number;
    weeklyLogins: number;
    longestLoginStreak: number;
    currentLoginStreak: number;
    totalTodosCompleted: number;
    level: Level;
}

export interface Level {
    number: number;
    currentExp: number;
    requiredExp: number;
    definition: LevelDefinition
}

export interface LevelDefinition {
    number: number;
    requiredExp: number;
    league: League;
}

export interface League {
    name: string;
}