import { ReactNode, useEffect, useRef, useState } from "react";

type Suspended = {
    isLoading: boolean;
    fallback: ReactNode;
    children: ReactNode;
};

export const Suspended = ({ isLoading, fallback, children }: Suspended) => {
    const timerRef = useRef<any>(null);
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setShowFallback(true);
        }, 500);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            clearTimeout(timerRef.current);
            setShowFallback(false);
        }
    }, [isLoading]);

    return showFallback ? fallback : children;
};
