import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

import {
    colors,
    fontSizes,
    gaps,
    cardSizes,
    cardSizeLabels,
    borderRadius,
    commonStyle
} from "../../contants/layout";

import RoundedButton from "../../components/Buttons";
import {ProfileCard} from "../FriendCard";


type ContactPanelProps = {
    friendName: string;
    friendNo: string;
    hasFriendInfo: boolean;
    buttonText?: string;
    onClick: (friendName: string, friendNo: string, friendDOB?: string) => void;
    onFileChange: (e: ProgressEvent<FileReader>, dom: HTMLInputElement) => void;
    friendDOB?: string;
    friendImagePath?: string;
}

type ContactPanelState = {
    friendName: string,
    friendNo: string,
    friendDOB?: string,
    friendImagePath?: string;
    buttonText?: string;
};

class ContactPanel extends React.Component<ContactPanelProps, ContactPanelState> {
    private friendNameElm: React.RefObject<HTMLInputElement> = React.createRef();
    private friendNoElm: React.RefObject<HTMLInputElement> = React.createRef();
    private friendDOBElm: React.RefObject<HTMLInputElement> = React.createRef();
    private friendPhotoElm: React.RefObject<HTMLInputElement> = React.createRef();

    constructor(props: ContactPanelProps) {
        super(props);

        this.state = {
            friendName: '',
            friendNo: '',
            friendDOB: '',
            friendImagePath: '',
            buttonText: 'Save',
        };

        this.friendNameElm = React.createRef();
        this.friendNoElm = React.createRef();
        this.friendDOBElm = React.createRef();
        this.friendPhotoElm = React.createRef();

        this.textChangeHandler = this.textChangeHandler.bind(this);
    }

    componentDidMount() {
        const {
            friendName,
            friendNo,
            friendDOB,
            buttonText,
            friendImagePath,
        } = this.props;

        this.setState({
            friendName,
            friendNo,
            friendDOB: friendDOB || '',
            friendImagePath: friendImagePath || '',
            buttonText: buttonText || 'Save',
        });
    }

    textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            friendName: this.friendNameElm.current!.value || '',
            friendNo: this.friendNoElm.current!.value || '',
            friendDOB: this.friendDOBElm.current!.value || '',
        });
    };

    clickHandler = () => {
        const {onClick} = this.props;
        const {
            friendName,
            friendNo,
            friendDOB,
        } = this.state;

        onClick(friendNo, friendName, friendDOB);
    };

    setFriendImage = (data: any) => {
        this.setState({ friendImagePath: data });
    };

    fileChangeHandler = () => {
        const {onFileChange} = this.props;

        const input = this.friendPhotoElm.current!;
        const inputFiles = this.friendPhotoElm.current!.files;

        if (inputFiles && inputFiles[0]) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target!.result as string;
                this.setFriendImage(result);
                onFileChange(e, input);
            };
            reader.readAsDataURL(inputFiles[0]);
        }
    };

    render() {
        const { hasFriendInfo } = this.props;
        const {
            friendName,
            friendNo,
            friendDOB,
            friendImagePath = '',
            buttonText = 'Save',
        } = this.state;

        return (
            <ContactPanelWrapper className="contact-screen">
                <div className="contact-panel">
                    <div className="friend-image">
                        <div className="clicker">
                            { !!hasFriendInfo
                                ? <ProfileCard
                                    className="photo"
                                    title={friendName}
                                    imagePath={friendImagePath} />
                                : <>{ friendImagePath !== '' ?
                                        <ProfileCard
                                            className="photo"
                                            title={'New Friend'}
                                            imagePath={friendImagePath} /> :
                                        <i><AddIcon fontSize="large" style={{color: colors.White}} /></i>
                                }</>
                            }

                            <label className="photo-uploader">
                                <input type="file"
                                       id="friendPhotoImage"
                                       name="friendPhotoImage"
                                       ref={this.friendPhotoElm}
                                       onChange={this.fileChangeHandler} />
                            </label>
                        </div>
                        <button>{ !!hasFriendInfo ? 'Change' : 'Add'} Photo</button>
                    </div>

                    <div className="form-area">
                        <div className="form-row">
                            <div className="label">Name *</div>
                            <div className="input">
                                <input type="text"
                                       name="friendName"
                                       placeholder="Name"
                                       ref={this.friendNameElm}
                                       defaultValue={friendName}
                                       onChange={this.textChangeHandler}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="label">Phone Number *</div>
                            <div className="input">
                                <input type="text"
                                       name="friendNo"
                                       placeholder="Format: 60123456789"
                                       ref={this.friendNoElm}
                                       defaultValue={friendNo}
                                       onChange={this.textChangeHandler}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="label">Birthday</div>
                            <div className="input">
                                <input type="text"
                                       name="friendDOB"
                                       placeholder="Format: DD/MM/YYYY"
                                       ref={this.friendDOBElm}
                                       defaultValue={friendDOB}
                                       onChange={this.textChangeHandler}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <RoundedButton text={buttonText} fullWidth={true} onClick={this.clickHandler} />
            </ContactPanelWrapper>
        );
    }

}

export default ContactPanel;


const labelWidth: string = '10rem';
const ContactPanelWrapper = styled.div`
    
    & .contact-panel {
        position: relative;
        margin-top: calc(${cardSizes[cardSizeLabels.Small][1]}rem / 2 + ${gaps.Common});
        border-radius: ${borderRadius}px;
        background-color: ${colors.White};
    }
    
    & .friend-image { 
        position: relative; 
        top: calc(-${cardSizes[cardSizeLabels.Small][1]}rem / 2);
        margin-bottom: calc(-${cardSizes[cardSizeLabels.Small][1]}rem / 2 + ${gaps.Common});
        text-align: center;
        
        & .clicker { 
            position: relative;
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
            
            & .photo-uploader { 
                ${commonStyle.absoluteFullStyle}
                height: calc(100% + ${gaps.Small} + ${fontSizes.Small});
                overflow: hidden;
                cursor: pointer;
                
                & input[type="file"] {
                    position: relative;
                    top: 100%;
                    opacity: 0;
                }
            }
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
    
    & .rounded-button {
        margin-top: ${gaps.Common};
    }    
`;
