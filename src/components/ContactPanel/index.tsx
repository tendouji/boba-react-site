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



const ContactPanel: React.FC<ContactPanelProps> = ({   hasFriendInfo,
                                                       friendName,
                                                       friendNo,
                                                       buttonText = 'Save',
                                                       onClick,
                                                       onFileChange,
                                                       friendDOB = '',
                                                       friendImagePath = ''}) => {
    const friendNameElm: React.RefObject<HTMLInputElement> = React.createRef();
    const friendNoElm: React.RefObject<HTMLInputElement> = React.createRef();
    const friendDOBElm: React.RefObject<HTMLInputElement> = React.createRef();
    const friendPhotoElm: React.RefObject<HTMLInputElement> = React.createRef();

    const [_friendImagePath, setFriendImage] = useState<string>('');

    const clickHandler = () => {
        onClick(
            friendNoElm.current!.value,
            friendNameElm.current!.value,
            friendDOBElm.current!.value,
        );
    };

    const fileChangeHandler = () => {
        const input = friendPhotoElm.current!;
        const inputFiles = friendPhotoElm.current!.files;

        if (inputFiles && inputFiles[0]) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target!.result as string;
                setFriendImage(result);
                onFileChange(e, input);
            };
            reader.readAsDataURL(inputFiles[0]);
        }
    };

    return (
        <ContactPanelWrapper className="error-screen">
            <div className="contact-panel">
                <div className="friend-image">
                    <div className="clicker">
                        { !!hasFriendInfo
                            ? <ProfileCard
                                className="photo"
                                title={friendName}
                                imagePath={_friendImagePath || friendImagePath} />
                            : <i><AddIcon fontSize="large" style={{color: colors.White}} /></i>
                        }

                        <label className="photo-uploader">
                            <input type="file"
                                   id="friendPhotoImage"
                                   name="friendPhotoImage"
                                   ref={friendPhotoElm}
                                   onChange={fileChangeHandler} />
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
                                   ref={friendNameElm}
                                   value={!!hasFriendInfo ? friendName : ''} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="label">Phone Number *</div>
                        <div className="input">
                            <input type="text"
                                   name="friendNo"
                                   placeholder="Format: 60123456789"
                                   ref={friendNoElm}
                                   value={!!hasFriendInfo ? friendNo : ''} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="label">Birthday</div>
                        <div className="input">
                            <input type="text"
                                   name="friendDOB"
                                   placeholder="Format: DD/MM/YYYY"
                                   ref={friendDOBElm}
                                   value={!!hasFriendInfo ? friendDOB : ''}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <RoundedButton text={buttonText} fullWidth={true} onClick={clickHandler} />
        </ContactPanelWrapper>
    );
};

export default ContactPanel;


const labelWidth: string = '10rem';
const ContactPanelWrapper = styled.div`
    position: relative;
    margin-top: calc(${cardSizes[cardSizeLabels.Small][1]}rem / 2 + ${gaps.Common});
    border-radius: ${borderRadius}px;
    background-color: ${colors.White};
    
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
