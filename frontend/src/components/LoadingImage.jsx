import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingImage = ({ src, alt, className, onClick, style }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="position-relative">
            {isLoading && (
                <div className="position-absolute top-50 start-50 translate-middle">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className={className}
                onClick={onClick}
                style={{ ...style,objectFit:'contain', maxWidth:'100%', opacity: isLoading ? 0 : 1 }}
                onLoad={() => setIsLoading(false)}
                loading="lazy"

            />
        </div>
    );
};

export default LoadingImage;
