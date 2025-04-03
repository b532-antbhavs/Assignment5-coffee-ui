const API_BASE_URL = 'http://localhost:8080';

async function placeOrder(orderData) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            let errorMessage = 'Unknown error occurred';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData;
            } catch (e) {
                errorMessage = await response.text();
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(`Network error: ${error.message}`);
    }
}