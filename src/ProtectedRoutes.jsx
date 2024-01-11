// import React from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
// import { useUserContext } from './UserContext.jsx';


// const ProtectedRoutes = ({ children }) => {
//   const history = useHistory();
//   const location = useLocation();

//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//   //const isCompanyLoggedIn = localStorage.getItem('isCompanyLoggedIn') === 'true';


// //   const handleSetUserId = (id) => {
// //     setUserId(id);
// //   };

//   const { userId, setUserId } = useUserContext();



//   if (!isLoggedIn) {
//     history.push('/');
//     return null;
//   }

 

//   return <>{children}</>;
// };

// export default ProtectedRoutes;

import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useUserContext } from './UserContext'; 

const ProtectedRoutes = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  //const { userId, setUserId } = useUserContext();

  if (!isLoggedIn) {
    history.push('/');
    return null;
  }

  return <>{children}</>;
};



export default ProtectedRoutes;
