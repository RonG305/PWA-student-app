import { Table } from "react-bootstrap"
import { FiEdit } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiFillEye } from "react-icons/ai"
import { useState } from "react"

const Teachers = () => {

    const [teachers, setTeachers] = useState([])

    const fetchTeachers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/teachers/')
            const data = await response.json()
            setTeachers(data)
            console.log(data)
       
        } catch (error) {
            console.log('Error occured while fetching teachers ', error)
        }
       
    
    }


    useState(() => {
        fetchTeachers()
    }, [])
    return (
        <div className='px-4 overflow-x-auto'>
        <h3 className='text-center my-4'>Teachers</h3>
        <Table className='w-100' striped bordered hover>
        <thead>
            <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th>Gender</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {teachers.map((teacher, index) => (
                <tr key={index}>
                <td>{ teacher.teacher_id}</td>
                <td>{teacher.first_name}</td>
                <td>{teacher.last_name}</td>
                <td>{teacher.department}</td>
                <td>{teacher.gender}</td>
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


export default Teachers