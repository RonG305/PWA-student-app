import { Table } from 'react-bootstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { AiFillEye } from 'react-icons/ai'

import { useState, useEffect } from 'react'
import StudentForm from './StudentForm'
import { Link, useParams } from 'react-router-dom'
import { syncDataWithServer, triggerSync } from '../../syncData'

import { addStudentToIndexedDB, clearIndexedDB, deleteStudentFromIndexedDB, getAllStudentsFromIndexDB } from '../../IndexedDBService'



const Students = () => {

    const [students, setStudents] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const params = useParams()

    const itemsPerPage = 10
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const itemsToShow = students.slice(startIndex, endIndex)


    const handleSync = () => {
        if (navigator.onLine) {
            triggerSync()
            alert('Data sync succesiful')
            clearIndexedDB()
            window.location.reload()
        
            
        } else {
            alert("Records can't sync, you are offline")
        }
     
       
    }

  
  

    const fetchStudents = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/students/")
            const data = await response.json()

            if (navigator.onLine ) {
                setStudents(data)
           
        
                
            } else {
                const indexedDBData = await getAllStudentsFromIndexDB();
                setStudents(indexedDBData);
            }
           
            console.log(data)
        } catch (error) {
            console.log('Error while fetching the data', error)
        }
    }


      


    const deleteStudent = async (id) => {
        
        if (navigator.onLine) {
            try {
                const response = await fetch(`http://localhost:8000/api/students/${id}/`, {
                    method: 'DELETE'
                })
                if (response.ok) {
                    fetchStudents()
                } else {
                    console.log('Error occured while deleting student')
                }
    
            } catch (error) {
                console.log('There was a server error durring deletion of student', error)
            }
        } else {
            deleteStudentFromIndexedDB(id)
            window.location.reload()
            console.log('deleted succesifully')
      }
        }
    



    useEffect(() => {
        fetchStudents()
     
      
    }, [])

    return (
        <div className='px-4 overflow-x-auto'>
            <div className='d-flex'>
                <StudentForm />
                <button className='btn btn-success my-2 mx-2' onClick={handleSync}>Sync data</button>
            </div>
           
             
            <h3 className='text-center my-4'>Students</h3>
            <Table className='w-100' striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>   
                <th>REG NO</th>
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
                    <td>{student.id}</td>   
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