import { getAllStudentsFromIndexDB } from "./IndexedDBService";

export const syncDataWithServer = async (data) => {
    try {
        const response = await fetch('http://localhost:8000/api/students/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log('Request Data:', JSON.stringify(data));
        console.log('Response Status:', response.status);
        console.log('Response Text:', await response.text());

        if (response.ok) {
            console.log('Data submitted successfully');
          
        } else {
            console.error('Data submission failed:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred while submitting data:', error);
    }
};



export const triggerSync = async () => {
    const offlineData = await getAllStudentsFromIndexDB()
    console.log(offlineData)

    if (offlineData) {
        if (syncDataWithServer(offlineData)) {
            console.log('Data synchronization success');
         
        } else {
            console.log('Data synchronization failed');
        }
    }
};
  
const studentExistsOnServer = async (id) => {
    try {
        const student = await fetch(`http://localhost:8000/api/students/${id}`)
        return student
    } catch (error) {
        console.log('Failed to fetch student with that id', error)
    }
}