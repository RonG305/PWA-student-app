import { useEffect, useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentFromIndexedDB } from '../../IndexedDBService';


const StudentEditForm = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);




  const [formData, setFormData] = useState({
    reg_number: '',
    first_name : '',
    last_name: '',
    email: '',
    gender: '',
    date_of_birth: '',
    religion: ''

})



  
    const fetchStudent = async () => {
      try {
        
          const response = await fetch(`http://localhost:8000/api/students/${params.id}/`)
        const data = await response.json()
        if (navigator.onLine) {
          setFormData(data)
          console.log(data)
          }
       
      } catch (error) {
          console.log('Error occured while getting data', error)
      }
  }

    useEffect(() => {
        fetchStudent()
    }, [params.id])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      
      if (navigator.onLine) {
        try {
          const response = await fetch(`http://localhost:8000/api/students/${params.id}/`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },

              body: JSON.stringify(formData)

          })

          if (response.ok) {
          
              navigate('/', {replace: true})
              console.log('submission succesiful')
          } else {
              console.log('error ocurred while submitting the data')
          }
      } catch (error) {
          console.log('Error in the form', error)
        } 

      } else {
        const student = getStudentFromIndexedDB(params.id)
        setFormData(student)

      }
       

    }
    return (
        <div className='my-5'>
    
        <h3 className='text-center my-2 text-primary text-bold'>Students Edit form</h3>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form className='container' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                name='reg_number'
                value={formData.reg_number}
                onChange={handleChange}
                placeholder="e.g SC234/1550/2019"
                autoFocus
              />
            </Form.Group>
            
                        
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name='first_name'
                value={formData.first_name}
                onChange={handleChange}
                placeholder="e.g James"
                autoFocus
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name='last_name'
                value={formData.last_name}
                onChange={handleChange}
                placeholder=" e.g Washington"
                autoFocus
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder="james@example.com"
                autoFocus
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Gender</Form.Label>
                <Form.Control as="select"
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="other">Other</option>
                </Form.Control>
            </Form.Group>
            
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name='date_of_birth'
                value={formData.date_of_birth}
                onChange={handleChange}
                
                autoFocus
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Religion</Form.Label>
            
              <Form.Control as="select"
                name='religion'
                value={formData.religion}
                onChange={handleChange}
                
                >
                    <option value="">Select Religion</option>
                    <option value="Christian">Christian</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Other">Other</option>
                </Form.Control>
            
            </Form.Group>
            
            <Button type='submit' variant="primary" onClick={handleClose}>
            Submit
          </Button>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
     

        </div>
    )
}

export default StudentEditForm