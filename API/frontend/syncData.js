

// Function to synchronize data with the server
export const syncDataWithServer = async (data) => {
    try {
      const response = await fetch('http://localhost/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        // Data synchronization successful
        return true;
      } else {
        console.error('Data synchronization failed:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error during data synchronization:', error);
      return false;
    }
  };
  
  // Function to trigger data synchronization when the app goes online
  export const triggerSync = async () => {
    const offlineData = JSON.parse(localStorage.getItem('offlineData'));
  
    if (offlineData) {
      const success = await syncDataWithServer(offlineData);
  
      if (success) {
        localStorage.removeItem('offlineData');
      }
    }
  };
  