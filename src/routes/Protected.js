import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Protected({children}){
    const {user} = useContext(AuthContext);

    if (!user){
        return <Navigate to="/" replace/>
    } else{
        return children;
    }
}