import React from 'react';
import styled from 'styled-components';

import AddIcon from '@material-ui/icons/Add';

import withMeiosis, {WithMeiosisProps} from "../../components/HOC";
import PageWithMenu from "../../components/PageWithMenu";
import {apiService} from "../../services/api";
import {
    borderRadius,
    cardSizeLabels,
    cardSizes,
    colors,
    commonStyle,
    fontSizes,
    gaps,
} from "../../contants/layout";
import {routes} from "../../contants/routes";

import RoundedButton from "../../components/Buttons";
// import ImageCard from "../../components/ImageCard";
// import FriendCard from "../../components/FriendCard";



interface ContactProps extends WithMeiosisProps {
    [key: string]: any;
}

interface ContactState extends WithMeiosisProps {
    friendInfo: any;
    senderId: string,
    selectedVoucher: string,

}

class Contact extends React.Component<ContactProps, ContactState> {
    private friendNameElm: React.RefObject<HTMLInputElement>;
    private friendNoElm: React.RefObject<HTMLInputElement>;
    private friendDOBElm: React.RefObject<HTMLInputElement>;

    constructor(props: ContactProps) {
        super(props);
        this.state = {
            friendInfo: {},
            senderId: '',
            selectedVoucher: '',
            ...props.globalStates!
        };

        this.friendNameElm = React.createRef();
        this.friendNoElm = React.createRef();
        this.friendDOBElm = React.createRef();
    }

    componentDidMount() {
        const { globalStates, match } = this.props;
        const selectedVoucher: string = match.params.selectedVoucher;

        this.setState({
            selectedVoucher,
            senderId: globalStates!.userInfo.id,
        });
    }

    saveContact = () => {
        const friendNo: string = this.friendNoElm.current!.value;
        const friendName: string = this.friendNameElm.current!.value;
        const friendDOB: string = this.friendDOBElm.current!.value;

        if(friendNo === '' || friendName === '') {
            const {globalActions} = this.props;

            globalActions.updateSnackBar({
                isShown: true,
                message: `Phone number and name are required!`,
                hasCTA: false,
            });
            return;
        }

        const {senderId} = this.state;

        apiService.ApiCall.AddContact({
            friendName,
            friendNo,
            friendDOB: friendDOB || '',
            senderId,
            onSuccess: this.onAddContactSuccess,
        });
    };

    onAddContactSuccess = (data: any) => {
        console.log('onAddContactSuccess', data);
        this.redirectToFriend();
    };

    redirectToFriend = () => {
        const { history } = this.props;

        history.push({
            pathname: routes.CONTACT + '/view',
            state: {
                hasSelectedVoucher: true,
                selectedVoucher: '',
            }
        });
    };

    render() {
        const { friendInfo } = this.state;

        const hasFriendInfo = !!friendInfo.username;

        return (
            <PageWithMenu>
                <ContactWrapper className="contact-screen">
                    <h2>Add Contact</h2>

                    <div className="add-form">
                        <div className="friend-image">
                            <div className="clicker">
                                { !!hasFriendInfo
                                    ? <div className="photo" />
                                    : <i><AddIcon fontSize="large" style={{color: colors.White}} /></i>
                                }
                            </div>
                            <button>{ !!hasFriendInfo ? 'Change' : 'Add'} Photo</button>
                        </div>

                        <div className="form-area">
                            <div className="form-row">
                                <div className="label">Name *</div>
                                <div className="input">
                                    <input type="text" name="friendName" placeholder="Name" ref={this.friendNameElm} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="label">Phone Number *</div>
                                <div className="input">
                                    <input type="text" name="friendNo" placeholder="Format: 60123456789" ref={this.friendNoElm} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="label">Birthday</div>
                                <div className="input">
                                    <input type="text" name="friendDOB" placeholder="Format: DD/MM/YYYY" ref={this.friendDOBElm} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <RoundedButton text={'Save'} fullWidth={true} onClick={this.saveContact} />
                </ContactWrapper>
            </PageWithMenu>
        );
    }
}

export default withMeiosis(Contact);


const labelWidth: string = '10rem';
const ContactWrapper = styled.div`
    height: 100%;
    padding: ${gaps.Common};
    box-sizing: border-box;
    background-color: ${colors.GrayLight};
    
    & h2 {  }
    
    & .add-form { 
        position: relative;
        margin-top: calc(${cardSizes[cardSizeLabels.Small][1]}rem / 2 + ${gaps.Common});
        border-radius: ${borderRadius}px;
        background-color: ${colors.White};
        
        & .friend-image { 
            position: relative; 
            top: calc(-${cardSizes[cardSizeLabels.Small][1]}rem / 2);
            margin-bottom: calc(-${cardSizes[cardSizeLabels.Small][1]}rem / 2 + ${gaps.Common});
            text-align: center;
            cursor: pointer;
            
            & .clicker { 
                display: flex;
                height: ${cardSizes[cardSizeLabels.Small][1]}rem;
                width: ${cardSizes[cardSizeLabels.Small][1]}rem;
                margin: 0 auto;
                border-radius: ${borderRadius}px;
                background-color: ${colors.Pink};
                align-items: center;
                justify-content: center;
            
                & .photo { }
                & > i { }
            }
            
            & > button { 
                margin: ${gaps.XSmall} auto 0;
                color: ${colors.Pink};
                border: 0;
                background: transparent;
            }
        }
        
        & .form-area { 
            & .form-row {  
                ${commonStyle.flexSpreadCenterStyle}
                border-bottom: 1px solid ${colors.GrayLight};
                
                &:last-child {
                    border-bottom: 0;
                }
            
                & .label { 
                    width: ${labelWidth};
                    padding: ${gaps.Common};
                    box-sizing: border-box;
                    font-size: ${fontSizes.Common};
                    color: ${colors.GrayDarker};
                }
                
                & .input {
                    width: calc(100% - ${labelWidth} - ${gaps.Small});
                
                    & > input[type="text"] {
                        width: 100%;
                        padding: ${gaps.Common};
                        box-sizing: border-box;
                        border: 0;
                        background: transparent;
                        font-size: ${fontSizes.Common};
                    }
                }
            }
        }
    }
    
    & .rounded-button {
        margin-top: ${gaps.Common};
    }    
`;
