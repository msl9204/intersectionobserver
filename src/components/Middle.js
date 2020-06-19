import React from "react";
import styled, { keyframes } from "styled-components";

const ShowUp = keyframes`
    0%{opacity: 0}
    100%{opacity: 1}

`;

const MiddleContainer = styled.div`
    display: flex;
    width: 50%;
    height: 200px;
    margin: 50px 0;

    align-items: center;
    justify-content: center;
`;

const MiddleContents = styled.div`
    animation: ${ShowUp} 3s;
`;

export default function Middle() {
    return (
        <MiddleContainer>
            <MiddleContents>공부하면서 정리한 내용들입니다.</MiddleContents>
        </MiddleContainer>
    );
}
