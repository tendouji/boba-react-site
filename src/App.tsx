/** TODO:
 * - OTP api
 * - if loggedin, LoginPage RegisterPage to go to Main page
 * - Add general photo placeholder for FriendCard image
 * - check after redeem, if voucher code is active or inactive
 * - add preloader / check all error handling for api and form validation
 * - clear all console.log
 * - hide snackbar if user change route / add auto close
 * - retrieve voucher 1 by 1 for gift details
 **/

import React from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import SnackBar from './components/SnackBar';
import withMeiosis, {WithMeiosisProps} from "./components/HOC";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import BrandDetails from './pages/BrandDetails';
import GiftDetails from './pages/GiftDetails';
import {colors} from "./contants/layout";
import {routes} from "./contants/routes";
import ShareGift from './pages/ShareGift';
import Contact from './pages/Contact';
import ThankYou from './pages/ThankYou';


declare global {
    interface Window {
        bobaObj: any;
        webkit: any;
        tempData: any;
    }
}


interface AppProps extends WithMeiosisProps {
    [key: string]: any
}

interface AppState extends WithMeiosisProps {
    [key: string]: any
}

class App extends React.Component<AppProps, AppState> {
    onSnackBarClose = () => {
        const { globalActions } = this.props;
        globalActions.updateSnackBar(false, '');
    };

    render() {
        const { globalStates } = this.props;

        return (
            <Router>
                <ScreenWrapper className="app-screen">
                    <Switch>
                        <Route exact path={routes.HOME} component={Main} />
                        <Route path={routes.SIGNIN} component={Login} />
                        <Route path={routes.SIGNUP} component={Register} />
                        <Route path={routes.MAIN} component={Main} />
                        <Route path={routes.CONTACT} component={Contact} />
                        <Route path={routes.BRAND_DETAILS + '/:id'} component={BrandDetails} />
                        <Route path={routes.GIFT_DETAILS + '/:id'} component={GiftDetails} />
                        <Route path={routes.SHARE_GIFT + '/:friendId'} component={ShareGift} />
                        <Route path={routes.THANK_YOU} component={ThankYou} />
                    </Switch>

                    <SnackBar
                        isShown={!!globalStates!.showSnackBar}
                        content={globalStates!.snackBarMessage}
                        onClose={this.onSnackBarClose}
                        hasCTA={!!globalStates!.snackBarHasCTA}
                        CTAButtonLabel={globalStates!.snackBarCTAButtonLabel}
                        onCTAClick={globalStates!.snackBarCTAClickHandler}
                    />
                </ScreenWrapper>
            </Router>
        );
    }
}

export default withMeiosis(App);


const ScreenWrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    // max-width: $ {screenMaxWidth};
    max-width: 50rem; // 800px
    margin: 0 auto;
    border-left: 1px solid ${colors.Gray};
    border-right: 1px solid ${colors.Gray};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: ${colors.White};
`;