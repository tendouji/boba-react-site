import React from 'react';
import styled from 'styled-components';

import RoundedButton from "../../components/Buttons";
import SearchBar from "../../components/SearchBar";

import {fontSizes, gaps} from "../../contants/layout";
import {routes} from "../../contants/routes";
import {BGCurve} from '../../assets';



type ErrorPanelProps = {
    title: string;
    message: string;
    history: any;
}

const ErrorPanel: React.FC<ErrorPanelProps> = ({title, message, history}) => {
    const clickHandler = () => {
        history.push({
            pathname: routes.HOME,
            state: {
                isRegister: false,
            }
        });
    };

    return (
        <ErrorPanelWrapper className="error-screen">
            <div className="center">
                <h2>{title}</h2>
                <div className="description"><span dangerouslySetInnerHTML={{__html: message}} /></div>
                <div className="cta-area">
                    <SearchBar onClick={(val: string) => console.log(`Searching: ${val}`)} />
                    <RoundedButton text="Back to Main" fullWidth={true} onClick={clickHandler} />
                    <a className="linker" href={'mailto: support@boba.gift'}>support@boba.gift</a>
                </div>
            </div>
        </ErrorPanelWrapper>
    );
};

export default ErrorPanel;


const ErrorPanelWrapper = styled.div`
    display: flex;
    height: 100%;
    padding: ${gaps.Common};
    box-sizing: border-box;
    text-align: center;
    // background: url(${BGCurve}) center top / contain no-repeat;
    justify-content: center;
    align-items: center;
    
    & h2 { 
        margin-bottom: ${gaps.XSmall};
    }
    
    & .description {
        margin-bottom: ${gaps.Large};
    }
    
    & .cta-area {
        padding: 0 ${gaps.Common} ${gaps.Common};
        
        & .search-bar {
            width: 100%;
            padding: 0;
        }
    
        & .rounded-button {
            margin: ${gaps.Large} 0 ${gaps.XSmall};
        }
        
        & .linker {
            font-size: ${fontSizes.Small};
        }
    }
`;
