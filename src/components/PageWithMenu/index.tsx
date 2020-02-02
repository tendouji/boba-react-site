import React from "react";
import styled from "styled-components";
import MenuBar from "../MenuBar";
import {elementSizes} from "../../contants/layout";

const PageWithMenu: React.FC<{title?: string, children: any}> = ({title, children}) => {
    return (
        <PageWithMenuWrapper className="page-with-menu">
            <div className="content-holder">
                {children}
            </div>
            <MenuBar />
        </PageWithMenuWrapper>
    );
};

export default PageWithMenu;


const PageWithMenuWrapper = styled.div`
    height: 100%;
    position: relative;
    
    & > .content-holder {
        height: calc(100% - ${elementSizes.MenuBarHeight});
        overflow: auto;
    }
`;