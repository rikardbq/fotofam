import {
    useState,
    useRef,
    MutableRefObject,
    SetStateAction,
    Dispatch,
} from "react";

export const useDoubleTap = (time: number = 250): {
    isDoubleTap: boolean;
    doubleTapHandler: () => void;
} => {
    const timer: MutableRefObject<any> = useRef(null);
    const [tapCount, setTapCount]: [number, Dispatch<SetStateAction<number>>] =
        useState(0);
    const [isDoubleTap, setDoubleTap]: [
        boolean,
        Dispatch<SetStateAction<boolean>>
    ] = useState(false);

    const doubleTapHandler: () => void = () => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setTapCount(0);
            setDoubleTap(false);
        }, time);

        const count = tapCount + 1;
        setTapCount(count);
        setDoubleTap(count > 1);
    };

    return { isDoubleTap, doubleTapHandler };
};
