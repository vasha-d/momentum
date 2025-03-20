

export default function DepartmentSelectField ({departments, loading, setWorkerData, value}) {

    let optionList = 'loading...'

    if (!loading) {
        optionList = departments.map((dep) => {
            let {id, name} = dep
            return (
                
                <option value={id} key={id}> {name} </option>
                
            )
        })
    }
    return (
        <div className={styles.departmentSectionWrapper}>
            <label htmlFor="department">დეპარტამენტი*</label>
            <select name="department" id="department" value={value && undefined}
                onChange={(e) => {handleChange(e, setWorkerData)}}   
            >
                {optionList}
            </select>
        </div>
    )
}