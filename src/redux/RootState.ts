export type AccountState = {
    status: string
    accountCode: string
    email: string
    accessToken: string
}

export type RootState ={
    account: AccountState,
 }