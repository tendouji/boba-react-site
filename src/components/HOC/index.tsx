import React from "react";
import flyd from "flyd";
import merge from "mergerino";

import {routes} from "../../constants/routes";
import {pageComponentList, sessionStorageKey} from "../../constants/app";
import {getSessionStorage} from "../../helpers";
import globalState, {GlobalStateInitialType} from "../../services/globalState";
import {apiService} from "../../services/api";


const update: flyd.Stream<unknown> = flyd.stream();
const states = flyd.scan(
    (state: GlobalStateInitialType, patch: any) => merge(state, patch),
    globalState.GlobalInitialState,
    update
);
const actions = globalState.Actions(update);

export interface WithMeiosisProps {
    // globalStates: flyd.Stream<GlobalStateInitialType>,
    globalStates?: GlobalStateInitialType,
    globalActions?: any,
}

type AnyProps = {
    [key: string]: any
}

const withMeiosis = <P extends WithMeiosisProps>(Component: React.ComponentType<P>) => {
    // class WithMeiosis extends React.Component<Subtract<P, WithMeiosisProps>, GlobalStateInitialType> {
    class WithMeiosis extends React.Component<P & WithMeiosisProps & AnyProps, GlobalStateInitialType> {
        private _isMounted: boolean;
        private unlisten: any;

        constructor(props: P) {
            super(props);
            this.state = states();

            this._isMounted = false;
        }

        componentDidMount() {
            this._isMounted = true;

            this.checkUserInfo();

            states.map((state: GlobalStateInitialType) => this._isMounted && this.setState(state));

            if(pageComponentList.indexOf(Component.name) > -1) { // NOTE: only check session if component is page
                apiService.ApiCall.HasSession({
                    onSuccess: this.onCheckSessionSuccess,
                    onError: this.onCheckSessionFailed,
                });
            }
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        onCheckSessionSuccess = () => actions.updateLoggedSession(true);

        onCheckSessionFailed = () => {
            actions.updateLoggedSession(false);
            this.redirectToSignIn();
        };

        redirectToSignIn = () => {
            const { history } = this.props;
            if( history.location.pathname !== routes.HOME ||
                history.location.pathname !== routes.SIGNIN ||
                history.location.pathname !== routes.SIGNUP) {
                history.replace({ pathname: routes.SIGNIN });
            }
        };

        checkUserInfo = () => {
            const sessionData = getSessionStorage(sessionStorageKey.user);
            if(!!sessionData && sessionData !== '') {
                const sessionDataObj = JSON.parse(sessionData);

                actions.updateUserInfo({
                    username: sessionDataObj.username,
                    id: sessionDataObj._id,
                    voucherifyId: sessionDataObj.voucherifyId,
                    sourceId: sessionDataObj.sourceId,
                    displayName: sessionDataObj.displayName,
                    email: sessionDataObj.email,
                    imagePath: sessionDataObj.imagePath || '',
                    createdAt: sessionDataObj.createdAt,
                    friends: sessionDataObj.friends,
                    notification: sessionDataObj.notification,
                    giftList: sessionDataObj.giftList,
                    metadata: sessionDataObj.metadata,
                });
            }
        };

        render() {
            return <Component globalStates={this.state} globalActions={actions} {...this.props as P} />;
        }
    }

    return WithMeiosis;
};


export default withMeiosis;
