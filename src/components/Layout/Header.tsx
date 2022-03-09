
import { FC, ReactElement } from "react";
import UserStatistic from "../UserProfile/UserStatistic";
import Statistic from "./Statistic";

const styles = {
  table: {
    tdleft: {
      with: '350px',
      paddingRight: '50px'  
    },
    tdRight: {
        width: '300px',
        alignItems: 'right'
    }
  }
}

const Header = (): ReactElement=> {
    return (
      <div className="header-metax">
         <table>
           <tr>
            <td><b>Total</b></td>
            <td><b>User</b></td>
           </tr>
           <tr>
             <td style={styles.table.tdleft}><Statistic/></td>
             <td style={styles.table.tdRight}><UserStatistic/></td>
           </tr>
         </table>
         <hr/>
      </div>
    )
}

export default Header