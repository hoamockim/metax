import { combineEpics, Epic } from "redux-observable";
import { signIn, signInGoogle, signOut, signUp } from "./userprofile/UserEpic";

const RootEpic: Epic = combineEpics( 
   signUp, signIn, signInGoogle, signOut
)

export default RootEpic