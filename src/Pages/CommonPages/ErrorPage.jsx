import Lottie from 'lottie-react';
import React from 'react';
import error from "../../../public/animation/404-Animation.json"

const ErrorPage = () => {
    return (
        <div className='min-h-screen max-w-screen-xl mx-auto'>
            <Lottie animationData={error} loop={true} />
        </div>
    );
};

export default ErrorPage;