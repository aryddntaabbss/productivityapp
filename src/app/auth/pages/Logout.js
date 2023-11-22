import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, selectAuthToken } from "../Store/UserSlice";

const Logout = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authToken = useSelector( selectAuthToken );

    useEffect( () =>
    {
        const handleLogout = async () =>
        {
            try
            {
                await dispatch( logoutUser( authToken ) );
                navigate( "/login" );
            } catch ( error )
            {
                console.error( "Error during logout:", error );
            }
        };

        handleLogout();
    }, [ dispatch, navigate, authToken ] );

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
};

export default Logout;
