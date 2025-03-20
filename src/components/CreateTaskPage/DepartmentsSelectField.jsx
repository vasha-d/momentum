import { useGetDepartments } from "../../api/getHooks"



export default function DepartmentsSelectField () {


    const {departments, loading} = useGetDepartments()

    console.log(departments)
    return (
        <>
            <label htmlFor="department">დეპარტამენტი*</label>
            <select name="department" id="department" >
                <option value="1" selected>დიზაინის დეპარტამენტი</option>
                <option value="2">ლოტისტიკის დეპარტამენტი</option>
                <option value="3">მარკეტინგის დეპარტამენტი</option>
                <option value="4">IT დეპარტამენტი</option>
                <option value="5">გაყიდვების დეპარტამენტი</option>
            </select>
        </>
    )
}