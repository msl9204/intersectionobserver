import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Middle from "./Middle";
import Contents from "./Contents";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
`;

export default function Main() {
    return (
        <PageContainer>
            <Header />
            <Middle />
            <Contents />
        </PageContainer>
    );
}
