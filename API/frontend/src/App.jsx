import './App.css'
import Departments from './components/Departments'
import Navbar from './components/NavScroll'

import Students from './components/Students'
import Teachers from './components/Teachers'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StudentForm from './components/StudentForm'
import StudentEditForm from './components/StudentEditForm'
import StudentView from './components/StudentView'


function App() {


  return (
    <div className='app'>
      <Router>
        <Navbar />
       
        <Routes>
          <Route path='/' element={<Students />} />
          <Route path='student/edit/:id' element={<StudentEditForm />} />
          <Route path='student/view/:id' element={ <StudentView />} />
          <Route path='teachers/' element={<Teachers />} />
          <Route path='departments/' element={<Departments />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
