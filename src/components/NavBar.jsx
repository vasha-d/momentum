import momentumIcon from '../assets/momentum-icon.svg'
import { Link } from "react-router-dom"
import styles from '../styles/NavBar.module.css'
import plusIcon from '../assets/plus-icon.svg'
function NavBar({setCreatingWorker} ) {

    function clickCreateWorker () {

        setCreatingWorker(worker => !worker)
    }
    return (
        <div className={styles.navBar}>
            <Link className={styles.momentumContainer} to='/'>
                <h2>Momentum</h2>
                <img src={momentumIcon} alt="" />
            </Link>
            <div onClick={clickCreateWorker} className={styles.createWorker} >თანამშრომლის შექმნა</div>
            <Link className={styles.createTask} to='/create-task'>
                <img src={plusIcon} alt="" />
                შექმენი დავალება
            </Link>
        </div>
    )

}


export default NavBar