import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { getAllStudentsFromIndexDB, getStudentFromIndexedDB } from "../../IndexedDBService"

const StudentView = () => {

    const [student, setStudent] = useState({})
    const params = useParams()
    

    const fetchStudent = async () => {

        if (navigator.onLine) {
            try {
                const response = await fetch(`http://localhost:8000/api/students/${params.id}/`)
                const data = await response.json()
                
                setStudent(data)
                console.log(data)
            } catch (error) {
                console.log('Error occured while getting data', error)
            }
        } else {
            const offlineData = await getStudentFromIndexedDB(params.id)
            if (offlineData) {
                setStudent(offlineData)
                console.log(offlineData)
            } else {
                console.log('Error while fetching offline data from IndexedDB')
            }
            
            
        }
    
    }

    useEffect(() => {
        fetchStudent()
    }, [params.id])

    return (
        <div className="container mt-4">
            <Card>
            <Card.Header as="h5">Student Details</Card.Header>
            <Card.Body>
                <Card.Title className="my-3">View Student Details</Card.Title>
                <Card.Text>
                    <p><strong>Registration Number: </strong>{ student.reg_number}</p>
                </Card.Text>
                
                <Card.Text>
                <div className="d-md-flex align-items-center justify-content-between">
                    <div className="col-md-6">
                        <div>
                        <p><strong>First Name: </strong>{student.first_name}</p>
                        <p><strong>Last Name: </strong>{student.last_name}</p>
                        <p><strong>Email address: </strong>{student.email}</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div>
                        <p><strong>Gender: </strong>{student.gender}</p>
                        <p><strong>Date of Birth: </strong>{student.date_of_birth}</p>
                        <p><strong>Religion: </strong>{student.religion}</p>
                        </div>
                    </div>
                    </div>
                
                </Card.Text>
                <Link to={'/'} className='btn btn-primary'>close</Link>
            </Card.Body>
    </Card>
        </div>
    )
}


export default StudentView