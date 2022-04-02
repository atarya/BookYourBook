import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { View, TouchableOpacity } from 'react-native';

// formik
import { Formik } from 'formik';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
} from './../components/styles';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

// colors
const { brand, darkLight, primary } = Colors;



const MobVerify = () => {
    // const [hidePassword, setHidePassword] = useState(true);
    // const [show, setShow] = useState(false);
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>Mobile Verification</PageTitle>
                <SubTitle>Code is sent to \MOBILE NO.\</SubTitle>

                <Formik
                    initialValues={{ OTP: '' }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Enter OTP"
                                icon="key"
                                placeholder="Enter your 6 digit OTP"
                                placeholderTextColor={'#777'}
                                onChangeText={handleChange('OTP')}
                                onBlur={handleBlur('OTP')}
                                value={values.OTP}
                                keyboardType="phone-pad"
                            />


                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Verify and Create Account</ButtonText>
                            </StyledButton>
                            <Line />
                            <ExtraView>
                                <ExtraText>Didn't recieved code? </ExtraText>
                                <TextLink>
                                    <TextLinkContent>Request Again in 20 sec</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
};

const MyTextInput = ({ label, icon, isDate, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props} />}

        </View>
    );
};

export default MobVerify;
