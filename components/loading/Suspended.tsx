import { ReactNode, useEffect, useRef, useState } from "react";

type Suspended = {
    isLoading: boolean;
    fallback?: ReactNode;
    threshold?: number;
    children: ReactNode;
};

export const Suspended = ({ isLoading, fallback = null, threshold = 500, children }: Suspended) => {
    const timerRef = useRef<any>(null);
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setShowFallback(true);
        }, threshold);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            clearTimeout(timerRef.current);
            setShowFallback(false);
        }
    }, [isLoading]);

    return showFallback ? fallback : children;
};
