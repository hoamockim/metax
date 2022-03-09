import { FC, ReactElement } from "react"
import { connect} from "react-redux"
import { createSelector, Selector } from "reselect"
import { RootState, StatisticState } from "../../redux/RootState"

type StatisticType = {
    signedup: number,
    activeInDay: number,
    active7DaysRolling: number
}

const statisticSelector = (state:RootState): StatisticState => state.statistic
const gettotalSignedUp: Selector<RootState, number> = createSelector(statisticSelector, (state: StatisticState): number => state.signedup)
const getActiveInDay: Selector<RootState, number> = createSelector(statisticSelector, (state: StatisticState): number => state.activeInDay)
const getActiveIn7DaysRolling: Selector<RootState, number> = createSelector(statisticSelector, (state: StatisticState): number => state.active7DaysRolling)

const mapStateToProps = (state: RootState) => ({
    signedup: gettotalSignedUp(state),
    activeInDay: getActiveInDay(state),
    active7DaysRolling: getActiveIn7DaysRolling(state)
})

const styles = {
    text: {
        alignItems: 'left'
    }
}

const Statistic: FC<StatisticType> = (props): ReactElement => {
    return(
        <>
            <ul style={styles.text}>
                <li>SignUp: {props.signedup}</li>
                <li>Active In day: {props.activeInDay}</li>
                <li>Active In 7 days rolling: {props.active7DaysRolling}</li>
            </ul>
        </>
    )
}

export default connect(mapStateToProps)(Statistic)