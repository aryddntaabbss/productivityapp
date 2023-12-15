import React from 'react';
import Img from "../../image/NotFound.png"
import "./notfound.scss";


const NotFound = () =>
{
    return (
        <div className='container'>
            <img src={ Img } alt='NotFoundImage' />
            <h2 className='title'>404 - Not Found</h2>
            <p className='paragraph'>The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;
