import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Modal,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import { CustomActivityIndicator } from '../component/CustomActivityIndicator';

class OTPVerificationUI extends Component {

    constructor(props) {
        super(props);

        this.focusNextField = this.focusNextField.bind(this);
        this.inputs = {};
        this.state = {
            OTP1: undefined,
            OTP2: undefined,
            OTP3: undefined,
            OTP4: undefined,
            OTP5: undefined,
            OTP6: undefined,
            onOTPVerificationProgress: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isOTPVerified !== undefined) {
            this.setState({
                onOTPVerificationProgress: false
            });
        }
    }

    focusNextField(id, text, inputIndex) {
        if (!text) {
            return;
        }

        if (inputIndex < 6) {
            this.inputs[id].focus();
        }

        switch (inputIndex) {
            case 1:
                this.setState({ OTP1: text });
                break;
            case 2:
                this.setState({ OTP2: text });
                break;
            case 3:
                this.setState({ OTP3: text });
                break;
            case 4:
                this.setState({ OTP4: text });
                break;
            case 5:
                this.setState({ OTP5: text });
                break;
            case 6:
                this.setState({ OTP6: text });
                break;
        }
    }

    renderSeparator = () => <View style={styles.separator} />

    renderBackButton = () => {
        return (
            <View style={styles.backButtonStyle}>
                <Icon
                    underlayColor="transparent"
                    name="chevron-with-circle-left"
                    type="entypo"
                    color="#C7C7CD"
                    size={30}
                    onPress={this.props.changeLoginWithPhoneModalViewState}
                />
            </View>
        );
    }

    renderCodeInput = (inputIndex) => {
        return (
            <TextInput
                style={styles.verificationCodeInputStyle}
                placeholderTextColor="#C7C7CD"
                keyboardType="phone-pad"
                maxLength={1}
                returnKeyType="next"
                borderWidth={1}
                borderColor="#DAA520"
                blurOnSubmit={false}
                ref={(input) => { this.inputs[String(inputIndex)] = input; }}
                onChangeText={(text) => this.focusNextField(String(inputIndex + 1), text, inputIndex)}
            />
        );
    }

    renderVerificationUI = () => {
        const { phoneNumberInputContainer } = styles;

        return (
            <Animatable.View style={phoneNumberInputContainer} animation="fadeInLeft">
                <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Verification Code</Text>
                {this.renderSeparator()}
                <Text style={{ color: '#FFFFFF', fontSize: 14 }}>Please enter 6 digit verification code.</Text>
                <View style={styles.verificationCodeInputContainer}>
                    {this.renderCodeInput(1)}
                    {this.renderCodeInput(2)}
                    {this.renderCodeInput(3)}
                    {this.renderCodeInput(4)}
                    {this.renderCodeInput(5)}
                    {this.renderCodeInput(6)}
                </View>
                {this.renderVerifyOTPButton()}
            </Animatable.View>
        );
    }

    onPressVerifyButton = () => {
        const { OTP1, OTP2, OTP3, OTP4, OTP5, OTP6 } = this.state;

        this.setState({
            onOTPVerificationProgress: true
        });

        this.props.verifyOTP(`${OTP1}${OTP2}${OTP3}${OTP4}${OTP5}${OTP6}`)
    }

    renderVerifyOTPButton = () => {
        const { isOTPVerified } = this.props;

        return (
            <View>
                <Button
                    buttonStyle={styles.verifyOTPButtonStyle}
                    icon={{ name: 'lock', type: 'simple-line-icon' }}
                    title="Submit OTP"
                    onPress={this.onPressVerifyButton}
                />
                <Text style={{ color: 'red', padding: 10 }}>{isOTPVerified === false ? 'Verification Unsuccessful' : ''}</Text>
            </View>
        );
    }

    renderVerfiedSuccessfullyUI = () => {
        const { changeLoginWithPhoneModalViewState } = this.props;

        return (
            <View style={styles.mainConatinerStyle} >
                <Animatable.View style={styles.phoneNumberInputContainer} animation="fadeInLeft">
                    <Text style={{ color: '#FFFFFF', fontSize: 28 }}>Verified Successfully</Text>
                    {this.renderSeparator()}
                    <Button
                        buttonStyle={styles.verifyOTPButtonStyle}
                        icon={{ name: 'lock-open', type: 'simple-line-icon' }}
                        title="  Done    "
                        onPress={changeLoginWithPhoneModalViewState}
                    />
                </Animatable.View>
            </View>
        );
    }

    render() {
        const { isOTPVerified } = this.props;
        const { onOTPVerificationProgress } = this.state;

        if (isOTPVerified) {
            return this.renderVerfiedSuccessfullyUI();
        }

        return (
            <View style={styles.mainConatinerStyle} >
                {this.renderBackButton()}
                {this.renderVerificationUI()}
                <Modal
                    visible={onOTPVerificationProgress}
                    transparent={true}
                    animationType="none"
                    onRequestClose={() => null}
                >
                    <CustomActivityIndicator />
                </Modal>
            </View>
        );
    }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    mainConatinerStyle: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2a2a'
    },
    floatingMenuButtonStyle: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 35
    },
    phoneNumberInputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    separator: {
        height: 0.5,//StyleSheet.hairlineWidth,
        backgroundColor: '#DAA520',
        marginTop: 15,
        marginBottom: 15,
        width: window.width / 1.3,
    },
    backButtonStyle: {
        alignSelf: 'center',
        position: 'absolute',
        top: 20,
        left: 20
    },
    verificationCodeInputContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    verificationCodeInputStyle: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    verifyOTPButtonStyle: {
        backgroundColor: 'transparent',
        borderRadius: 25,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#DAA520'
    },
});

export default OTPVerificationUI;

OTPVerificationUI.propTypes = {
    isOTPVerified: PropTypes.bool,
    verifyOTP: PropTypes.func,
    changeOTPVerificationUIState: PropTypes.func,
    changeLoginWithPhoneModalViewState: PropTypes.func
}
