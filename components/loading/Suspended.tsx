import { ReactNode, useEffect, useRef, useState } from "react";

type Suspended = {
    isLoading: boolean;
    fallback?: ReactNode;
    threshold?: number;
    children: ReactNode;
};

export const Suspended = ({
    isLoading,
    fallback = null,
    threshold = 0,
    children,
}: Suspended) => {
    const timerRef = useRef<any>(null);
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        clearTimeout(timerRef.current);

        if (isLoading) {
            timerRef.current = setTimeout(() => {
                setShowFallback(true);
            }, threshold);
        } else {
            setShowFallback(false);
        }
    }, [isLoading]);

    return showFallback ? fallback : children;
};
