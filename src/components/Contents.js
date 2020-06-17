import React from "react";
import styled, { keyframes } from "styled-components";

const ContentsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const ContentContents = styled.div``;

export default function Contents() {
    return (
        <ContentsContainer>
            <ContentContents>12345</ContentContents>
            <ContentContents>12345</ContentContents>
            <ContentContents>12345</ContentContents>
            <ContentContents>12345</ContentContents>
        </ContentsContainer>
    );
}
