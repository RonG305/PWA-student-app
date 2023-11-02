import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const StudentForm = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [formData, setFormData] = useState({
        reg_number: '',
        first_name : '',
        last_name: '',
        email: '',
        gender: '',
        date_of_birth: '',
        religion: ''

    })

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
          const response = await fetch('http://localhost:8000/api/students/', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',

              },

              body: JSON.stringify(formData)
              
          })

          console.log('Request Data:', formData);
          console.log('Request Headers:', JSON.stringify(response.headers));

          if (response.ok) {
              console.log('data submitted succesifully')
              window.location.reload()
          } else {
              console.log('Failed during data submission')
          }
      } catch (error) {
          console.log('An error occured in fetching form data', error)
      }
      } else {
        const offlineData = JSON.parse(localStorage.getItem('offlineData')) || [];
        offlineData.push(formData);
        localStorage.setItem('offlineData', JSON.stringify(offlineData));

      }

       
    }


  



    return (
    <div>
     <Button variant="primary" className='mt-2' onClick={handleShow}>
        add student 
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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

export default StudentForm