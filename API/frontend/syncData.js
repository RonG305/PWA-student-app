export const syncDataWithServer = async (data) => {
    try {
        const response = await fetch('http://localhost:8000/api/students/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log('Request Data:', data);
        console.log('Request Headers:', JSON.stringify(response.headers));

        if (response.ok) {
            console.log('Data submitted successfully');
           localStorage.removeItem('offlineData')
        } else {
            console.error('Data submission failed:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred while submitting data:', error);
    }
};
