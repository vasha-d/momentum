
import styles from "../../../styles/DisplayAllTasksPage/Filters.module.css"

export default function PrioDropDown ({choosing, confirmFilters, handleCheck, currentFilters}) {
    if(!choosing) return null;
    return (
        <div className={styles.prioDropDown}>
            <div className={styles.checkBoxWrapper}>
                <input checked = {currentFilters.prio1}type="checkbox" onChange={handleCheck}name="prio" id="prio1" />
                <label htmlFor="prio1">დაბალი</label>
            </div>
            <div className={styles.checkBoxWrapper}>
                <input checked = {currentFilters.prio2}type="checkbox" onChange={handleCheck} name="prio" id="prio2" />
                <label htmlFor="prio2">საშუალო</label>
            </div>
            <div className={styles.checkBoxWrapper}>
                <input checked = {currentFilters.prio3}type="checkbox" onChange={handleCheck} name="prio" id="prio3" />
                <label htmlFor="prio3">მაღალი</label>
            </div>
            <button onClick={confirmFilters} className={styles.confirmPrio}>
                არჩევა
            </button>
        </div>
    )
}