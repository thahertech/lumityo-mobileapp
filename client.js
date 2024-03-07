const sendOrderToCloudFunction = async (orderData) => {
  const backendEndpoint = 'http://127.0.0.1:5001/lumityo-project/us-central1/api/sendEmail';

  try {
    console.log('Order Data:', orderData); 
    const response = await fetch(backendEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      console.log('Order sent successfully!');
    } else {
      console.error(`Failed to send order. Status: ${response.status}, ${response.statusText}`);
    }

    return response; // Add this line to return the response object
  } catch (error) {
    console.error('Fetch error occurred:', error.message);
    throw error; // Rethrow the error to propagate it
  }
};

export default sendOrderToCloudFunction;