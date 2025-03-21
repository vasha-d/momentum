import styles from "../../../styles/DisplayAllTasksPage/Filters.module.css"


export default function DepartmentDropDown ({choosing, confirmFilters, handleCheck, currentFilters}) {

    if(!choosing) {return null}

    return (
        <div className={styles.depDropDown}>
            <div className={styles.checkBoxWrapper}>
                <input checked={currentFilters.dep1}type="checkbox" onChange={handleCheck} name="dep" id="dep1" />
                <label htmlFor="dep1">ადმინისტრაცია</label>
            </div>
            <div className={styles.checkBoxWrapper}>
                <input checked={currentFilters.dep2}type="checkbox" onChange={handleCheck} name="dep" id="dep2" />
                <label htmlFor="dep2">ადამიანური რესურსები</label>
            </div>
            <div className={styles.checkBoxWrapper}>
                <input checked={currentFilters.dep3}type="checkbox" onChange={handleCheck} name="dep" id="dep3" />
                <label htmlFor="dep3">ფინანსები</label>
            </div>
            <div className={styles.checkBoxWrapper}>
                <input checked={currentFilters.dep4}type="checkbox" onChange={handleCheck} name="dep" id="dep4" />
                <label htmlFor="dep4">მარკეტინგი</label>
            </div>
            <div className={styles.checkBoxWrapper}>
                <input checked={currentFilters.dep5}type="checkbox" onChange={handleCheck} name="dep" id="dep5" />
                <label htmlFor="dep5">ლოჯისტიკა</label>
            </div>
            <div className={styles.checkBoxWrapper}>
                <input checked={currentFilters.dep6}type="checkbox" onChange={handleCheck} name="dep" id="dep6" />
                <label htmlFor="dep6">ტექნოლოგია</label>
                
            </div>
            <div className={styles.checkBoxWrapper}>
                <input checked={currentFilters.dep7}type="checkbox" onChange={handleCheck} name="dep" id="dep7" />
                <label htmlFor="dep7">მედია</label>
                
            </div>
            <button onClick={confirmFilters} className={styles.confirmDep}>
                არჩევა
            </button>
        </div>
    )
}   
