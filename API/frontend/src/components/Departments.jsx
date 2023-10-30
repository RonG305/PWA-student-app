import { Table } from "react-bootstrap"
import { FiEdit } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiFillEye } from "react-icons/ai"
import { useState, useEffect } from "react"

const Departments = () => {

    const [departments, setDepartments] = useState([])


    const fetchDepartments = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/departments/')
            const data = await response.json()
            setDepartments(data)
            console.log(data)
        } catch (error) {
            console.log('an error occured while fetching departments', error)
        }
    }


    useEffect(() => {
      fetchDepartments()
    }, [])
    
    return (
           <div className='px-4 overflow-x-auto'>
        <h3 className='text-center my-4'>Departments</h3>
        <Table className='w-100' striped bordered hover>
        <thead>
            <tr>
            <th>Department Code</th>
            <th>Department Name</th>
            <th>Head of Department</th>
            
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {departments.map((department, index) => (
                <tr key={index}>
                <td>{ department.department_code}</td>
                <td>{department.department_name}</td>
                <td>{department.head_of_department}</td>
               
                <td className=' d-flex  align-items-center justify-content-around'>
                    <FiEdit size={20} />
                    <RiDeleteBin6Line size={20} />
                    <AiFillEye size={20} />
                </td>
               
            </tr>
                
                
            ))}        
           
        </tbody>
        </Table>
    </div>
    )
}

export default Departments