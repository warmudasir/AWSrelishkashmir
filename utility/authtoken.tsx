import jwt, { JwtPayload } from "jsonwebtoken";

type userDataType = {
  firstName: string;
  email: string;
  lastname: string;
  role: string;
};

type decodedType = string | JwtPayload | userDataType;

export const getUserToken = (): userDataType | null => {
  if (typeof window === "undefined") {
    // Ensure that this code only runs in the browser
    return null;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.decode(token as string) as decodedType;

    // Type guard to narrow down the type
    if (typeof decoded === "object" && "firstName" in decoded) {
      return decoded as userDataType;
    }

    return null;
  } catch (err) {
    console.error("Token is invalid or expired", err);
    return null;
  }
};
