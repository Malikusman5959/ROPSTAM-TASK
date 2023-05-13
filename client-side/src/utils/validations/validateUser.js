import jwt_decode from "jwt-decode";

export const authorizationHeader = () => {
  let token = localStorage.getItem('token');
  if (validateToken(token))
  {
    return {headers: {"Authorization" : `Bearer ${token}`}};
  }
}

export const isAuthorized = () => {
  let token = localStorage.getItem('token');
    if (token && validateToken(token)) {
     return true;
    }
    else{
      return false;
    }
} 

const validateToken = (token) => {

  let decodedToken = jwt_decode(token);
  let currentDate = new Date();

  // JWT exp is in seconds
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return false;
  } else {
    return true;
  }
}