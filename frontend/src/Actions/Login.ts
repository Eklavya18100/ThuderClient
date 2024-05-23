import axios from 'axios';

// Define the HTTP client with your base URL
const http = axios.create({
  baseURL: import.meta.env.VITE_LMS_BACKEND_URL,
});

// Function to verify email and password
const verifyEmailPassword = async (email:any, password:any) => {
  try {
    const response = await http.post('login/verifyEmailPassword', {
      email: email,
      password: password,
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error verifying email and password:', error);
    throw error;
  }
};

export { verifyEmailPassword };
