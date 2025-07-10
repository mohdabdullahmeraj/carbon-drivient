import axios from 'axios';

export const checkAuth = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/auth/me', {
      withCredentials: true
    });
    return res.data.user;
  } catch (err) {
    return null;
  }
};
