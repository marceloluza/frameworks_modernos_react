import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const AlertPage: React.FC<{ variant: string, message: string, show: boolean }> =
    ({ variant, message, show }) => {
        const [showState, setShowState] = useState(show);

        useEffect(() => {
            setShowState(show);
            setTimeout(() => {
                setShowState(false);
            }, 5000);
        }, [show]);

        return (
            <>
                {showState ? (
                    <Alert key={variant} variant={variant}>
                        {message}
                    </Alert>
                ) : (
                    null
                )}
            </>
        );

    };

export default AlertPage;
