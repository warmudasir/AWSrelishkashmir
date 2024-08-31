// import jwt from 'jsonwebtoken';
import jwt, { JwtPayload } from 'jsonwebtoken';
const SECRET_KEY ='hello123';

type userDataType={
  firstName: string;
  email:string;
  lastname:string;
  role:string;
}
type decodedType = string | JwtPayload;
export const getUserToken = ():userDataType | decodedType | null => {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  try {
      const decoded = jwt.verify(token,SECRET_KEY);

    return decoded;
  } catch (err) {
    console.error('Token is invalid or expired', err);
    return null;
  }
};
