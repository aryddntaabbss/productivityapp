import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserType } from "../auth/Store/UserSlice";

const PrivateRoute = ( { element } ) =>
{
    const dispatch = useDispatch();
    const isAuthenticated = useSelector( ( state ) => state.user.isAuthenticated );
    const userType = useSelector( ( state ) => state.user.userType );

    useEffect( () =>
    {
        if ( !userType && isAuthenticated )
        {
            dispatch( fetchUserType() );
        }
    }, [ userType, isAuthenticated, dispatch ] );

    if ( !isAuthenticated )
    {
        return <Navigate to="/login" />;
    }

    return element;
};

export default PrivateRoute;
