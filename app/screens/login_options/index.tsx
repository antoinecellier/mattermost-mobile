// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {useIntl} from 'react-intl';
import {Image, ScrollView, StatusBar, StyleSheet, Text} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {SafeAreaView} from 'react-native-safe-area-context';

import FormattedText from '@components/formatted_text';
import {goToScreen} from '@screens/navigation';
import {preventDoubleTap} from '@utils/tap';

import EmailOption from './email';
import GitLabOption from './gitlab';
import GoogleOption from './google';
import LdapOption from './ldap';
import Office365Option from './office365';
import OpenIdOption from './open_id';
import SamlOption from './saml';

type LoginOptionsProps = {
    componentId: string;
    config: ClientConfig;
    license: ClientLicense;
    theme: Theme;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15,
        fontSize: 32,
        fontWeight: '600',
    },
    subheader: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '300',
        color: '#777',
        marginBottom: 15,
        lineHeight: 22,
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 15,
        flex: 1,
    },
});

const LoginOptions: NavigationFunctionComponent = ({config, license, theme}: LoginOptionsProps) => {
    const intl = useIntl();

    const displayLogin = preventDoubleTap(() => {
        const screen = 'Login';
        const title = intl.formatMessage({id: 'mobile.routes.login', defaultMessage: 'Login'});

        goToScreen(screen, title);
    });

    const displaySSO = preventDoubleTap((ssoType: string) => {
        const screen = 'SSO';
        const title = intl.formatMessage({id: 'mobile.routes.sso', defaultMessage: 'Single Sign-On'});

        goToScreen(screen, title, {ssoType});
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.innerContainer}
            >
                <StatusBar/>
                <Image
                    source={require('@assets/images/logo.png')}
                    style={{height: 72, resizeMode: 'contain'}}
                />
                <Text style={styles.header}>
                    {config.SiteName}
                </Text>
                <FormattedText
                    style={styles.subheader}
                    id='web.root.signup_info'
                    defaultMessage='All team communication in one place, searchable and accessible anywhere'
                />
                <FormattedText
                    style={[styles.subheader, {fontWeight: 'bold', marginTop: 10}]}
                    id='mobile.login_options.choose_title'
                    defaultMessage='Choose your login method'
                />
                <EmailOption
                    config={config}
                    onPress={displayLogin}
                    theme={theme}
                />
                <LdapOption
                    config={config}
                    license={license}
                    onPress={displayLogin}
                    theme={theme}
                />
                <GitLabOption
                    config={config}
                    onPress={displaySSO}
                    theme={theme}
                />
                <GoogleOption
                    config={config}
                    onPress={displaySSO}
                    theme={theme}
                />
                <Office365Option
                    config={config}
                    license={license}
                    onPress={displaySSO}
                    theme={theme}
                />
                <OpenIdOption
                    config={config}
                    license={license}
                    onPress={displaySSO}
                    theme={theme}
                />
                <SamlOption
                    config={config}
                    license={license}
                    onPress={displaySSO}
                    theme={theme}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginOptions;
