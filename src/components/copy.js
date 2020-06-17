import { useState, useEffect, useCallback } from "react";

const baseOption = {
    root: null,
    threshold: 0.5,
    rootMargin: "0px",
};
const useIntersect = (onIntersect, option) => {
    const [ref, setRef] = useState(null);
    const checkIntersect = useCallback(([entry], observer) => {
        if (entry.isIntersecting) {
            onIntersect(entry, observer);
        }
    }, []);
    useEffect(() => {
        let observer;
        if (ref) {
            observer = new IntersectionObserver(checkIntersect, {
                ...baseOption,
                ...option,
            });
            observer.observe(ref);
        }
        return () => observer && observer.disconnect();
    }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
    return [ref, setRef];
};

export default useIntersect;

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useIntersect from "./useIntersect";

import "./styles.css";

const fakeFetch = (delay = 1000) =>
    new Promise((res) => setTimeout(res, delay));

const ListItem = ({ number }) => (
    <div className="ListItem">
        <span>{number}</span>
    </div>
);
function App() {
    const [state, setState] = useState({ itemCount: 0, isLoading: false });
    /* fake async fetch */
    const fetchItems = async () => {
        setState((prev) => ({ ...prev, isLoading: true }));
        await fakeFetch();
        setState((prev) => ({
            itemCount: prev.itemCount + 10,
            isLoading: false,
        }));
    };
    /* initial fetch */
    useEffect(() => {
        fetchItems();
    }, []);
    const [_, setRef] = useIntersect(async (entry, observer) => {
        observer.unobserve(entry.target);
        await fetchItems();
        observer.observe(entry.target);
    }, {});
    const { itemCount, isLoading } = state;
    if (!itemCount) return null;
    return (
        <div className="App">
            {[...Array(itemCount)].map((_, i) => {
                return <ListItem key={i} number={i} />;
            })}
            <div ref={setRef} className="Loading">
                {isLoading && "Loading..."}
            </div>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
