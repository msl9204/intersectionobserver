import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import useInterSect from "../hooks/useIntersect";

const SlideIn = keyframes`
    0%{
        transform: translatey(150px);

        opacity: 0;

    }
    100%{
        transform: translatey(0px);

        opacity: 1;

    }
`;

const ContentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;
const ContentContents = styled.div`
    width: auto;
    height: 250px;
    border: 1px solid black;
    margin: 10px 0;
    animation: ${SlideIn} 2s;
`;

const LoadingContainer = styled.div``;

function RenderContainer() {
    const [Count, setCount] = useState(0);
    const [_, setRef] = useInterSect(async (entry, observer) => {
        observer.unobserve(entry.target);
        await getItems();
        console.log("보이고 있습니다.");
        observer.observe(entry.target);
    }, {});

    const getItems = async () => {
        await fakeFetch();
        setCount((prev) => prev + 1);
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <React.Fragment>
            <ContentsContainer>
                {[...Array(Count)].map((_, i) => {
                    return (
                        <ContentContents ref={setRef}>{i}번</ContentContents>
                    );
                })}
            </ContentsContainer>
        </React.Fragment>
    );
}

async function fakeFetch(delay = 1000) {
    new Promise((res) => setTimeout(res, delay));
}

export default function Contents() {
    return (
        <React.Fragment>
            <RenderContainer />
            <LoadingContainer>로딩중입니다.</LoadingContainer>
        </React.Fragment>
    );
}
