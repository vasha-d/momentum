import styles from '../../styles/DisplayAllTasksPage/DepartmentSigns.module.css'

// MEDIA = design = 7
// marketing  = 4
// logistics = 5
// IT = 6
export default function DepartmentSigns ({id}) {


    let signStyle = styles[`department${id}`]
    let name = null
    switch (id) {
        case 6:
            name = 'ინფ. ტექ.'
            break;
        case 7:
            name = 'დიზაინი'
            break;
        case 5:
            name = 'ლოჯისტიკა'
            break;
        case 4:
            name = 'მარკეტინგი'
            break;
        default:
            break;
    }
    return (
        <div className={signStyle}>
            {name}
        </div>
    )
}