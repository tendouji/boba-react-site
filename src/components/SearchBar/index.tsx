import React from "react";
import styled from "styled-components";
import {
    borderRadius,
    colors,
    elementSizes,
    fontSizes, gaps
} from "../../contants/layout";
import SearchIcon from '@material-ui/icons/Search';


type SearchBarProps = {
    onClick: (val: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({onClick}) => {
    let searchKey: string = '';

    const onClickHandler = (e: React.MouseEvent | React.TouchEvent) => {
        onClick(searchKey);
    };

    const onKeyUpHandler = (e: React.KeyboardEvent) => {
        const target = e.target as HTMLInputElement;
        searchKey = target.value;
    };

    const onKeyPressHandler = (e: React.KeyboardEvent) => {
        const code = (e.keyCode ? e.keyCode : e.which);
        if(code === 13) { // NOTE: Enter keycode
            onClick(searchKey);
        }
    };

    return (
        <SearchBarWrapper className="search-bar">
            <div className="input-holder">
                <input
                    type="text"
                    className="search"
                    placeholder={'Search Gifts'}
                    onKeyUp={onKeyUpHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button className="search-button">
                    <SearchIcon
                        style={{ color: colors.Pink }}
                        onClick={onClickHandler}
                    />
                </button>
            </div>
        </SearchBarWrapper>
    );
};

export default SearchBar;


const SearchBarWrapper = styled.div`
    padding: 0 ${gaps.Common} ${gaps.Large};
    box-sizing: border-box;
    
    & .input-holder {
        height: ${elementSizes.SearchBarHeight};
        background-color: ${colors.White};
        border: 1px solid ${colors.PinkLight};
        border-radius: ${borderRadius}px;
        
        & input[type="text"] {
            float: left;
            width: calc(100% - ${elementSizes.SearchBarHeight} - ${gaps.Small});
            padding: 0 ${gaps.Common};
            line-height: ${elementSizes.SearchBarHeight};
            border: 0;
            box-sizing: border-box;
            background: transparent;
            font-size: ${fontSizes.Common};
            
            &:focus {
                outline: none;
            }
        }
        
        & .search-button {
            float: right;
            height: ${elementSizes.SearchBarHeight};
            width: ${elementSizes.SearchBarHeight};
            border: 0;
            background: transparent;
            
            &:focus {
                outline: none;
            }
        }
    }
`;