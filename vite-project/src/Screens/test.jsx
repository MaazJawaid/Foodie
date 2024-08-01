import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const MyComponent = () => {
    // Extract authentication data from the Redux store
    const isAuthenticated = useSelector(state => state.login.isAuthenticated);
    const user = useSelector(state => state.login.user);
    const token = useSelector(state => state.login.token);

    // You can use the authentication data here
    useEffect(() => {
        console.log('Component re-rendered:', isAuthenticated);
    }, [isAuthenticated]);

    return (
        <div>
            {/* Render component based on authentication status */}
            {isAuthenticated ? (
                <div>
                    <p>Welcome, {user.name}!</p>
                    <p>Your token: {token}</p>
                    {/* Render content for authenticated users */}
                </div>
            ) : (
                <div>
                    {/* Render content for non-authenticated users */}
                    <p>Please log in to access this content.</p>
                </div>
            )}
        </div>
    );
};

export default MyComponent;
