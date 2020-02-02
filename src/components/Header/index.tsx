import React from "react";
// import styled from "styled-components";

const Header: React.FC<{input?: number}> = ({input}) => {
    return (
        <header>header: {input}</header>
    );
};

export default Header;