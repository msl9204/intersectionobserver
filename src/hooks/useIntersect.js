import React, { useState, useCallback, useEffect } from "react";

const baseOption = {
    root: null,
    threshold: 0.5,
    rootMargin: "0px",
};

export default function useInterSect(onIntersect) {
    const [Ref, setRef] = useState(null);
    const checkIntersect = useCallback(([entry], observer) => {
        if (entry.isIntersecting) {
            onIntersect(entry, observer);
        }
    }, []);
    useEffect(() => {
        let observer;
        if (Ref) {
            observer = new IntersectionObserver(checkIntersect, {
                ...baseOption,
            });
            observer.observe(Ref);
        }

        return () => observer && observer.disconnect();
    }, [Ref, checkIntersect]);

    return [Ref, setRef];
}
