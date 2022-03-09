import { FC, ReactElement } from "react";
import { connect, Selector } from "react-redux";
import { createSelector } from "reselect";
import { RootState, StatisticState } from "../../redux/RootState";

type UserStatisticType = {
    signinCounter: number,
    lastTimeSignIn: number
}

const statisticSelector = (state:RootState): StatisticState => state.statistic
const getSigninCounter: Selector<RootState, number> = createSelector(statisticSelector, (state: StatisticState): number =>  state.signinCounter)
const getlastTimeSignin: Selector<RootState, number> = createSelector(statisticSelector, (state: StatisticState): number => state.lastTimeSignin)

const mapStateToProps = (state: RootState) => ({
    signinCounter: getSigninCounter(state),
    lastTimeSignIn: getlastTimeSignin(state)
})

const styles = {
    text: {
        alignItems: 'left'
    }
}

const UserStatistic: FC<UserStatisticType> = (props): ReactElement => {
    return(
        <>
            <ul style={styles.text}>
                <li>Number of times login:  {props.signinCounter}</li> 
                <li>Lasttime login: {props.lastTimeSignIn}</li>
                <li>&nbsp;</li>
            </ul>
        </>
    )
}

export default connect(mapStateToProps)(UserStatistic)