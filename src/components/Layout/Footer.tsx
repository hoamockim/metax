import { FC, ReactElement } from "react";

const Footer = (): ReactElement => {
    const styles = {
        container: {
            bottom: '0px',
            width: '100%',
            position: 'absolute' as any
        }
    }
    return (
     <div style={styles.container}>
         <hr/>
        <footer className="footer-metax" >
            <p>This is a metax's test implemented by <a href="https://github.com/hoamockim">Quy Kim</a></p>
        </footer>
     </div>
    )
}

export default Footer