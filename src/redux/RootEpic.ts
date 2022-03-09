import { combineEpics, Epic } from "redux-observable";
import { activeAccount, changePassword, signIn, signUp, statistic } from "./userprofile/UserEpic";

const RootEpic: Epic = combineEpics( 
   signUp, signIn, activeAccount, changePassword, statistic
)

export default RootEpic