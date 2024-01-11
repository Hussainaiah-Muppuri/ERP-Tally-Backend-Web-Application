import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useUserContext } from './UserContext'; 
import { debounce } from 'lodash';

const ProtectedCompanyRoutes = ({ children }) => {

const history = useHistory();
const debouncedPush = debounce(history.push, 300); // Adjust the delay as needed

    const location = useLocation();
  
    const isLoggedIn = localStorage.getItem('IsCompanyLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');
    if (!isLoggedIn) {
        // If not logged in and not trying to access the home page, redirect to home
        // history.push('/Home/' + userId);
        debouncedPush('/Home/' + userId);
        return null; // Render nothing immediately, as the redirect will happen
    }
  return <>{children}</>;
};

export default ProtectedCompanyRoutes;
