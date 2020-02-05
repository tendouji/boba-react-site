import React from 'react';
import styled from 'styled-components';

import withMeiosis, {WithMeiosisProps} from "../../components/HOC";
import PageWithMenu from "../../components/PageWithMenu";
import {apiService} from "../../services/api";
import { colors, gaps } from "../../contants/layout";
import {routes} from "../../contants/routes";

import RoundedButton from "../../components/Buttons";
import ContactPanel from '../../components/ContactPanel';
// import ImageCard from "../../components/ImageCard";
// import FriendCard from "../../components/FriendCard";



interface ContactDetailsProps extends WithMeiosisProps {
    [key: string]: any;
}

interface ContactDetailsState extends WithMeiosisProps {
    friendInfo: any;
    newFriendNo: string,
    selectedVoucher: string,
    friendPhotoDom?: HTMLInputElement;
    friendPhotoBinary?: any,
}

class ContactDetails extends React.Component<ContactDetailsProps, ContactDetailsState> {
    constructor(props: ContactDetailsProps) {
        super(props);
        this.state = {
            friendInfo: {},
            newFriendNo: '',
            selectedVoucher: '',
            friendPhotoDom: undefined,
            friendPhotoBinary: null,
            ...props.globalStates!
        };
    }

    componentDidMount() {
        const { match } = this.props;

        apiService.ApiCall.GetContactByNumber({
            phone: match.params.id,
            onSuccess: (data: any) => {
                this.setState({ friendInfo: data.result[0] });
            },
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
            onSuccess: this.onAddContactSuccess,
        });
    };

    onAddContactSuccess = (data: any) => {
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
        })


        //var formData = new FormData();
        // formData.append('cardDesignImage', fileDom.files[0]);

        /*
        fetch('/api-admin/card-design/upload-image/' + cardDesignId, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'cache-control': 'no-cache',
            },
            mode: 'cors',
            body: formData
        })
            .then(res => res.json())
            .then(data => { console.log(data) })
            .catch(err => { console.log(err) });
        */

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
                <ContactDetailsWrapper className="contact-screen">
                    <h2>Contact details</h2>

                    <ContactPanel
                        hasFriendInfo={hasFriendInfo}
                        friendName={friendInfo.displayName}
                        friendNo={friendInfo.username}
                        friendDOB={friendInfo.dob}
                        friendImagePath={friendInfo.imagePath}
                        buttonText={'Edit Contact'}
                        onClick={this.saveContact}
                        onFileChange={this.fileInputChange}
                    />
                </ContactDetailsWrapper>
            </PageWithMenu>
        );
    }
}

export default withMeiosis(ContactDetails);


const ContactDetailsWrapper = styled.div`
    height: 100%;
    padding: ${gaps.Common};
    box-sizing: border-box;
    background-color: ${colors.GrayLighter};
`;
