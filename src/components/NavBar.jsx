
import { Link } from "react-router-dom"
function NavBar( ) {


    return (
        <div id="navBar">
            <Link to='/'>
                <h2>NavBar..........</h2>
                
            </Link>
            
            <Link to='/create-task'>Create Task</Link>
            <Link to='/create-worker'>Add Worker</Link>
        </div>
    )

}


export default NavBar