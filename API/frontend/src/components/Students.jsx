import { Table } from 'react-bootstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { AiFillEye } from 'react-icons/ai'

import { useState, useEffect } from 'react'
import StudentForm from './StudentForm'
import { Link, useParams } from 'react-router-dom'




const Students = () => {

    const [students, setStudents] = useState([])
    const params = useParams()
  

    const fetchStudents = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/students/")
            const data = await response.json()
            setStudents(data)
            console.log(data)
        } catch (error) {
            console.log('Error while fetching the data', error)
        }
    }


    const deleteStudent = async (params) => {
        try {
            const response = await fetch(`http://localhost:8000/api/students/${params}/`, {
                method: 'DELETE'
            })


            if(response.ok) {
                fetchStudents()
            } else {
                console.log('Error occured while deleting student')
            }

        } catch (error) {
            console.log('There was a server error durring deletion of student', error)
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    return (
        <div className='px-4 overflow-x-auto'>
             <StudentForm />
             
            <h3 className='text-center my-4'>Students</h3>
            <Table className='w-100' striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <tr key={index}>
                    <td>{ student.reg_number}</td>
                    <td>{student.first_name}</td>
                    <td>{student.last_name}</td>
                    <td>{student.email}</td>
                    <td>{student.gender}</td>
                    
                    <td className=' d-flex  align-items-center justify-content-around'>
                        <Link to={`student/edit/${student.id}`}><FiEdit size={20} /></Link>
                        
                        <RiDeleteBin6Line
                            onClick={() => deleteStudent(student.id)}
                            style={{cursor: 'pointer'}}
                            size={20} />
                       <Link to={`/student/view/${student.id}`}><AiFillEye size={20} /></Link>
                    </td>
                   
                </tr>
                    
                    
                ))}        
               
            </tbody>
            </Table>

            <div className='d-flex gap-3 align-items-center justify-content-center'>
                <button className='btn btn-primary'>previous</button>
                <p>page 5 of 20</p>
                <button className='btn btn-primary'>Next</button>
            </div>
        </div>
    )
}

export default Students