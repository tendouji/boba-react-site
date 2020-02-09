import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import StarIcon from '@material-ui/icons/Star';
import {grey} from "@material-ui/core/colors";

import {apiService} from "../../services/api";
import {
    borderRadius,
    colors,
    commonStyle,
    elementSizes,
    fontSizes,
    gaps,
} from "../../constants/layout";
import {brandDetailsLinks} from "../../constants/app";
import {routes} from "../../constants/routes";
import {removeLastSlash} from "../../helpers";

import withMeiosis, {WithMeiosisProps} from "../../components/HOC";
import PageWithMenu from "../../components/PageWithMenu";
import RoundedButton from "../../components/Buttons";
import Preloader from "../../components/Preloader";
import {Imager} from "../../components/ImageCard";


interface BrandDetailsProps extends WithMeiosisProps {
    [key: string]: any;
}

interface BrandDetailsState extends WithMeiosisProps {
    brandData: any;
    merchantId: string;
    isLoading: boolean,
}

class BrandDetails extends React.Component<BrandDetailsProps, BrandDetailsState> {
    constructor(props: BrandDetailsProps) {
        super(props);
        this.state = {
            brandData: [],
            merchantId: '',
            isLoading: true,
            ...props.globalStates!
        }
    }

    componentDidMount() {
        const { match } = this.props;
        const merchantId: string = match.params.id;

        this.setState({ merchantId });

        apiService.ApiCall.GetMerchantById({
            merchantId,
            onSuccess: this.onGetMerchantByIdSuccess,
        });
    }

    onGetMerchantByIdSuccess = (data: any) => {
        this.setState({
            brandData: data.result,
            isLoading: false
        });
    };

    render() {
        const {
            brandData,
            merchantId,
            isLoading,
        } = this.state;
        const ratingArr: number[] = Array.from(Array(5).keys());

        return (
            <PageWithMenu>
                { !!isLoading ? (
                    <Preloader isShown={true} />
                ) : (
                    <BrandWrapper className="brand-screen">
                        <div className="cover-image" style={{backgroundImage: `url(${removeLastSlash(apiService.apiBasePath) + brandData.imagePath})`}}>
                            <div className="resizer"><i /></div>
                        </div>
                        <div className="brand-header">
                            <Imager
                                className="logo"
                                title={brandData.name}
                                imagePath={removeLastSlash(apiService.apiBasePath) + brandData.iconPath}
                            />
                            <div className="info">
                                <h3>{brandData.name}</h3>
                                <div className="rating">
                                    { ratingArr.map((item, key) => (
                                        <StarIcon key={key} style={{
                                            fontSize: 25,
                                            ...(key < +brandData.rating ? { color: colors.Pink } : { color: grey[300] })
                                        }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="details-menu">
                            <ul>
                                { brandDetailsLinks.map((item: any, key: number) => (
                                    <li key={key}>
                                        <Link
                                            className="brand-link"
                                            to={`${routes.GIFT_DETAILS}/${merchantId}${item.path}`}
                                        >
                                            <div className="icon">{item.icon}</div>
                                            <div className="title">{item.label}</div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="gift-list">
                            <div className="gift-category">
                                <h4>Gifts</h4>
                                <div className="card">
                                    <div className="image" />
                                    <div className="info">
                                        <div className="description">sdfsdf sdfsdfsd sdfsd</div>
                                        <div className="cta">
                                            <RoundedButton text="Gift Now" onClick={() => null} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="image" />
                                    <div className="info">
                                        <div className="description">sdfsdf sdfsdfsd sdfsd</div>
                                        <div className="cta">
                                            <RoundedButton text="Gift Now" onClick={() => null} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="gift-category">
                                <h4>Gift Cards</h4>
                                <div className="card">
                                    <div className="image" />
                                    <div className="info">
                                        <div className="description">sdfsdf sdfsdfsd sdfsd</div>
                                        <div className="cta">
                                            <RoundedButton text="Gift Now" onClick={() => null} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="image" />
                                    <div className="info">
                                        <div className="description">sdfsdf sdfsdfsd sdfsd</div>
                                        <div className="cta">
                                            <RoundedButton text="Gift Now" onClick={() => null} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BrandWrapper>
                )}
            </PageWithMenu>
        );
    }
}

export default withMeiosis(BrandDetails);


const BrandWrapper = styled.div`
    height: 100%;
    
    & .cover-image {
        background: ${colors.Gray} center / cover no-repeat;
        
        & .resizer {
            max-width: 600px;
            margin: auto;
            
            & > i {
                display: block;
                padding-bottom: 50%;
            }
        }
    }
    
    & .brand-header {
        display: flex;
        padding: ${gaps.Common};
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        
        & .logo {
            height: ${elementSizes.MerchantLogoHeight};
            width: ${elementSizes.MerchantLogoHeight};
            border-radius: ${borderRadius}px;
            border: 1px solid ${colors.Pink};
            background: ${colors.White} center / cover no-repeat;
        }
        
        & .info {
            width: calc(100% - ${elementSizes.MerchantLogoHeight} - ${gaps.Common});
            
            & h3 { 
                font-size: ${fontSizes.XLarge};
                margin-bottom: ${gaps.Small};
            }
            
            & .rating { 
                font-size: ${fontSizes.XLarge};
            }
        }
    }
    
    & .details-menu {
        padding-top: ${gaps.Common};
        border-bottom: 1px solid ${colors.Pink};
                        
        & ul {
            display: flex;
            ${commonStyle.blankListStyle};
            
            & li {
                border-right: 1px solid ${colors.Pink};
                width: 33.33%;
                
                &:last-child {
                    border-right: 0;
                }
                
                & > a {
                    display: block;
                    height: 85px;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 ${gaps.Small} ${gaps.Common}; 
                    text-decoration: none;
                    text-align: center;
                    font-size: ${fontSizes.Small};
                    
                    & .icon {
                        display: block;
                        height: 40px;
                        width: 40px;
                        margin: 0 auto ${gaps.Small};
                    }
                }
            }        
        }
    }
    
    & .gift-list {
        padding: 0 ${gaps.Common};
        
        & .gift-category {
            & h4 { 
                padding-top: ${gaps.Large};
                box-sizing: border-box;
                font-size: ${fontSizes.XLarge};
            }
            
            & .card {
                display: flex;
                padding: ${gaps.Large} 0;
                box-sizing: border-box;
                border-bottom: 1px solid ${colors.Pink};
                justify-content: space-between;
                align-items: stretch;
            
                & .image { 
                    height: ${elementSizes.MerchantLogoHeight};
                    width: ${elementSizes.MerchantLogoHeight};
                    border-radius: ${borderRadius}px;
                    border: 1px solid ${colors.Gray};
                    background: ${colors.White} center / cover no-repeat;
                }
               
                & .info {
                    display: flex;
                    width: calc(100% - ${elementSizes.MerchantLogoHeight} - ${gaps.Common});
                    flex-direction: column;
                    
                    & .description { 
                        margin-bottom: ${gaps.Small};
                    }
                    
                    & .cta { 
                        margin-top: auto;
                        text-align: right;
                    }
               }
            }
            
            &:last-child {
                & .card {
                    &:last-child {
                        border-bottom: 0;
                    }
                }            
            }
        }
    }
`;
