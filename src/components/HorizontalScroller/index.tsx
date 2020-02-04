import React  from 'react';
import styled from 'styled-components';
import {commonStyle, gaps} from "../../contants/layout";


type HorizontalScrollerProps = {
    height: number,
    onRef?: any,
    scrollHandler?: any,
    sidePadded?: boolean,
}

class HorizontalScroller extends React.Component<HorizontalScrollerProps> {
    componentDidMount() {
        const { onRef } = this.props;
        if(!!onRef) onRef(this);
    }

    componentWillUnmount() {
        const { onRef } = this.props;
        if(!!onRef) onRef(null);
    }

    render() {
        const {
            height,
            sidePadded,
            scrollHandler,
            children,
        } = this.props;

        return (
            <HorizontalScrollerWrapper
                className="scroller-component"
                sidePadded={!!sidePadded}
                height={height}
                onScroll={scrollHandler || null}
            >
                <div className="scroller">
                    {!!sidePadded && <div className="filler" />}
                    {children}
                    {!!sidePadded && <div className="filler" />}
                </div>
            </HorizontalScrollerWrapper>
        );
    }
}


export default HorizontalScroller;

type HorizontalScrollerWrapperProps = {
    height: number,
    sidePadded: boolean,
}

const HorizontalScrollerWrapper = styled('div')<HorizontalScrollerWrapperProps>`
    height: ${props => props.height || '240'}px;
    padding: ${gaps.Common} 0;
    overflow: hidden;
    
    & .scroller {
        height: calc(100% + ${gaps.Common});
        white-space: nowrap;
        overflow-x: auto; 
        vertical-align: top;
        
        & > ul {
            ${props => props.sidePadded ? `display: inline-block;` : ``}
            ${commonStyle.blankListStyle}
            
            & > li {
                display: inline-block;
                white-space: normal;
                vertical-align: top;
            }
        }
            
        & .filler {
            display: inline-block;
            width: ${gaps.Common};
        }
    }
    
    & .scroller::-webkit-scrollbar {
        display: none; // only for webkit!
    }
`;
