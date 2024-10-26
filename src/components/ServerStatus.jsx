import React, { useState, useEffect } from 'react';

function ServerStatus() {
    const [isBackendUp, setIsBackendUp] = useState(false);
    const [show, setShow] = useState(true);

    const checkServerStatus = async () => {
        try {
            const response = await fetch("https://quick-convo-server.vercel.app");
            if (response.ok) { 
                setIsBackendUp(true);
            } else {
                setIsBackendUp(false);
            }
        } catch (error) {
            console.error("Error fetching server status:", error);
            setIsBackendUp(false);
        }
    };

    useEffect(() => {
        checkServerStatus(); 

        const interval = setInterval(() => {
            checkServerStatus(); 
        }, 10000);

        return () => clearInterval(interval); 
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div>
            {isBackendUp ? (
                show && (
                    <p style={{ textAlign: 'center', padding: '10px', fontSize: '14px', color: 'green' }}>
                        Backend is up & running
                    </p>
                )
            ) : (
                <p style={{ textAlign: 'center', padding: '10px', fontSize: '14px', color: 'red' }}>
                    Backend is down. Please try again after some time or inform the admin.
                </p>
            )}
        </div>
    );
}

export default ServerStatus;
