export type AccountState = {
    status: string
    email: string
    accessToken: string
}

export type StatisticState = {
    signedup: number,
    activeInDay: number,
    active7DaysRolling: number
    signinCounter: number,
    lastTimeSignin: number
}

export type RootState = {
    account: AccountState,
    statistic: StatisticState,
}