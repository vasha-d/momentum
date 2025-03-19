import styles from '../../styles/DisplayAllTasksPage/DepartmentSigns.module.css'

// ადმინისტრ = 1
// hr = 2
// finance = 3
// marketing  = 4
// logistics = 5
// IT = 6
//  design = 7
// მედია = 8
//
//

export default function DepartmentSigns ({id}) {


    let signStyle = styles[`department${id}`]
    let names = [
        '',
        'ადმინისტრაცია',
        'ადამ. რეს.',
        'ფინანსები.',
        'მარკეტინგი',
        'ლოჯისტიკა',
        'ინფ. ტექ.',
        'დიზაინი',
        'მედია'
    ]
    let name = names[id]
    return (
        <div className={signStyle}>
            {name}
        </div>
    )
}