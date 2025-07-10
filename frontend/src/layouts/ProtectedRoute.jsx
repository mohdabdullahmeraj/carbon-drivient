import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '../utils/auth'; // create this file

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    checkAuth().then(user => {
      setIsAuth(!!user);
    });
  }, []);

  if (isAuth === null) return <div className="text-center mt-10">Checking auth...</div>;

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}
