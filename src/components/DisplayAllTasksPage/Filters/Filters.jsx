
import { useState } from "react"
import styles from "../../../styles/DisplayAllTasksPage/Filters.module.css"
import PrioDropDown from "./PrioDropDown"
import DepartmentDropDown from "./DepartmentDropDown"
import EmployeeDropDown from "./EmployeeDropDown"
import dropDownIcon from "../../../assets/drop-down-icon.svg"


export default function Filters ({filters, setFilters}) {

    const [choosingDep, setChoosingDep] = useState(null)
    const [choosingPrio, setChoosingPrio] = useState(null)
    const [choosingEmp, setChoosingEmp] = useState(null)
    const [currentEmployee, setCurrentEmployee] = useState(filters.employee)
    const [unconfirmedFilters, setUnfonfirmedFilters] = useState(filters)
    function clickCheckBox (e) {

        let checked = e.target.checked
        let targetId = e.target.id
        let filterType = e.target.name

        setUnfonfirmedFilters(oldFilters => {
            let oldThisType = oldFilters[filterType]
            let addition = {...oldThisType, [targetId]: checked}
            return {...oldFilters, [filterType]: addition}

        })
    }

    function confirmPrioFilters () {
        setFilters((old) => {
            let oldPrioFilters = old.prio
            let newPrioFilters = {...oldPrioFilters, ...unconfirmedFilters.prio}
            return {...old, prio: newPrioFilters}
        })
        setChoosingPrio(false)
    }
    function confirmDepFilters () {
        setFilters((old) => {
            let oldDepFilters = old.dep
            let newDepFilters = {...oldDepFilters, ...unconfirmedFilters.dep}
            return {...old, dep: newDepFilters}
        })
        setChoosingDep(false)
    }
    function closeOthers(keep) {

        if (keep == 'emp') {
            if (choosingDep) {
                openCloseDep()
            }
            if (choosingPrio) {
                openClosePrio()
            }
            return
        }
        if (keep == 'dep') {
            if (choosingEmp) {
                openCloseEmp()
            }
            if (choosingPrio) {
                openClosePrio()
            }
        }
        if (keep == 'prio') {
            if (choosingDep) {
                openCloseDep()
            }
            if (choosingEmp) {
                openCloseEmp()
            }
        }
    }
    function openClosePrio () {
        if (!choosingPrio) {
            closeOthers('prio')
            setChoosingPrio(true)
            return
        }

        setUnfonfirmedFilters(old => {
            let newPrio = filters.prio
            return {...old, prio: newPrio}
            
        })
        setChoosingPrio(false)
    }
    function openCloseDep () {
        if (!choosingDep) {
            closeOthers('dep')
            setChoosingDep(true)    
            
            return
        }

        setUnfonfirmedFilters(old => {
            let newDep = filters.dep
            return {...old, dep: newDep}
            
        })
        setChoosingDep(false)
    }

    function openCloseEmp () {
        if(!choosingEmp) {
            closeOthers('emp')
            setChoosingEmp(true)
        } else {
            setCurrentEmployee(filters.employee)
            setChoosingEmp(false)
        }
    }
    
    return (
        <div className={styles.filtersContainer}>

                <div className={styles.departsmentFilter}>
                    <div onClick={openCloseDep} className={styles.filterName}>
                            დეპარტამენტი
                        <img src={dropDownIcon} alt="" />
                    </div>
                    <DepartmentDropDown choosing={choosingDep}
                                        handleCheck={clickCheckBox}
                                        confirmFilters = {confirmDepFilters}
                                        currentFilters = {unconfirmedFilters.dep}
                    ></DepartmentDropDown>
                </div>
                <div className={styles.priorityFilter}>
                    <span onClick={openClosePrio} className={styles.filterName}>
                        პრიორიტეტი
                        <img src={dropDownIcon} alt="" />

                    </span>
                    <PrioDropDown choosing={choosingPrio}
                                  handleCheck={clickCheckBox}
                                  confirmFilters = {confirmPrioFilters}
                                  currentFilters = {unconfirmedFilters.prio}
                    ></PrioDropDown>
                </div>
                <div className={styles.employeeFilter}>
                    <div onClick={openCloseEmp}  className={styles.filterName}>
                        თანამშრომელი
                        <img src={dropDownIcon} alt="" />
                    </div>
                    <EmployeeDropDown setFilters={setFilters}
                                      choosing = {choosingEmp}
                                      setChoosing = {setChoosingEmp}
                                      currentEmployee={currentEmployee}
                                      setCurrentEmployee={setCurrentEmployee}
                    ></EmployeeDropDown>
                </div>

        </div>
    )
}