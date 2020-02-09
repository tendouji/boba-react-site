import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {
    buttonSizes,
    colors,
    commonStyle,
    elementSizes,
    fontSizes
} from "../../constants/layout";
import {menuBarLinks} from "../../constants/app";
import withMeiosis, {WithMeiosisProps} from "../HOC";



const MenuBar: React.FC<WithMeiosisProps> = ({globalActions, globalStates}) => {
    return (
        <MenuBarWrapper className="menu-bar">
            <ul>{ menuBarLinks.map((item, key) => {
                const isActive: boolean = globalStates!.curPage === item.label;

                return (
                    <li key={key} className={isActive ? 'active' : ''}>
                        <Link to={item.path} title={item.name}>
                            <div className="icon">
                                <item.icon color={isActive ? colors.Pink : undefined} />
                            </div>
                        </Link>
                    </li>
                );
            })}</ul>
        </MenuBarWrapper>
    );
};

export default withMeiosis(MenuBar);


const MenuBarWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${elementSizes.MenuBarHeight};
    border-top: 1px solid ${colors.Gray};
    box-sizing: border-box;
    
    & > ul {
        display: flex;
        height: 100%;
        ${commonStyle.blankListStyle}
        
        & li {
            height: 100%;
            width: 25%;
            
            & > a {
                position: relative;
                display: flex;
                height: 100%;
                text-align: center;
                text-decoration: none;
                box-sizing: border-box;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                
                & .icon {
                    line-height: 1em;
                    height: ${buttonSizes.Common};
                    width: ${buttonSizes.Common};
                    
                    & > svg {
                        height: 100%;
                        width: 100%;
                    }
                }
                
                & .text {
                    font-size: ${fontSizes.Small};
                    line-height: ${fontSizes.Small};
                }
            }
            
            &.active {
                & > a {
                    &:before {
                        position: absolute;
                        top: 0;
                        left: 20%;
                        height: 3px;
                        width: 60%;
                        content: '';
                        background: ${colors.Pink};
                    }
                }        
            }
        }
    }
`;