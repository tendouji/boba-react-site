import React from 'react';
import styled from 'styled-components';

import {apiService} from "../../services/api";
import {
    borderRadius,
    cardSizeLabels,
    cardSizes,
    colors,
    commonStyle,
    fontSizes,
    gaps,
} from "../../constants/layout";
import {routes} from "../../constants/routes";
import {sessionStorageKey} from "../../constants/app";
import {setSessionStorage} from "../../helpers";

import withMeiosis, {WithMeiosisProps} from "../../components/HOC";
import PageWithMenu from "../../components/PageWithMenu";
import ContactPanel from "../../components/ContactPanel";



interface AddContactProps extends WithMeiosisProps {
    [key: string]: any;
}

interface AddContactState extends WithMeiosisProps {
    friendInfo: any;
    newFriendNo: string,
    senderId: string,
    selectedVoucher: string,
    friendPhotoDom?: HTMLInputElement;
    friendPhotoBinary?: any,
}

class AddContact extends React.Component<AddContactProps, AddContactState> {
    private friendNameElm: React.RefObject<HTMLInputElement>;
    private friendNoElm: React.RefObject<HTMLInputElement>;
    private friendDOBElm: React.RefObject<HTMLInputElement>;

    constructor(props: AddContactProps) {
        super(props);
        this.state = {
            friendInfo: {},
            newFriendNo: '',
            selectedVoucher: '',
            friendPhotoDom: undefined,
            friendPhotoBinary: null,
            senderId: '',
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

    fileInputChange = (e: ProgressEvent<FileReader>, dom: HTMLInputElement) => {
        this.setState({ friendPhotoDom: dom }, () => {
            const { friendPhotoDom } = this.state;

            if(!!friendPhotoDom) {
                if(friendPhotoDom.files && friendPhotoDom.files[0]) {
                    const reader = new FileReader();

                    reader.addEventListener('load', () => {
                        this.setState({ friendPhotoBinary: reader.result });
                    });

                    if(reader.readyState === FileReader.LOADING) reader.abort();

                    reader.readAsBinaryString(friendPhotoDom.files[0]);
                }
            }
        });
    };

    saveContact = (friendNo: string, friendName: string, friendDOB?: string) => {
        if(friendNo === '' || friendName === '') {
            const {globalActions} = this.props;

            globalActions.updateSnackBar({
                isShown: true,
                message: `Phone number and name are required!`,
                hasCTA: false,
            });
            return;
        }

        this.setState({ newFriendNo: friendNo });

        apiService.ApiCall.AddContact({
            friendName,
            friendNo,
            friendDOB: friendDOB || '',
            isAdd: true,
            onSuccess: this.onAddContactSuccess,
        });
    };

    onAddContactSuccess = (data: any) => {
        const {globalActions} = this.props;
        globalActions.updateUserInfoByKey('friends', data.result.friends);
        setSessionStorage(sessionStorageKey.user, data.result);

        // NOTE: update data success, so let's upload photo now
        const {
            newFriendNo,
            friendPhotoDom,
            friendPhotoBinary
        } = this.state;

        if(!friendPhotoDom || !friendPhotoBinary) {
            return;
        }

        if(!friendPhotoDom.files || friendPhotoDom.files.length === 0) { // NOTE: no file selected
            return;
        }

        // NOTE: If there is a selected file, wait it is read
        // NOTE: If there is not, delay the execution of the function
        if( !friendPhotoBinary && friendPhotoDom.files.length > 0 ) {
            setTimeout(() => this.onAddContactSuccess(data), 10);
            return;
        }

        apiService.ApiCall.AddContactPhoto({
            fileObj: friendPhotoDom.files[0],
            friendNo: newFriendNo,
            onSuccess: (data: any) => {
                globalActions.updateUserInfoByKey('friends', data.result.userInfo.friends);
                setSessionStorage(sessionStorageKey.user, data.result.userInfo);
            }
        })

        // this.redirectToFriend();
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
                <AddContactWrapper className="contact-screen">
                    <h2>Add Contact</h2>

                    <ContactPanel
                        hasFriendInfo={hasFriendInfo}
                        friendName={''}
                        friendNo={''}
                        buttonText={'Add Contact'}
                        onClick={this.saveContact}
                        onFileChange={this.fileInputChange}
                    />
                </AddContactWrapper>
            </PageWithMenu>
        );
    }
}

export default withMeiosis(AddContact);


const labelWidth: string = '10rem';
const AddContactWrapper = styled.div`
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
