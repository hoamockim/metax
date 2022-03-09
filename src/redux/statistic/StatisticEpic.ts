import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { StatisticState } from "../RootState";

export type StatisticEpic = Epic<AnyAction, AnyAction, StatisticState>