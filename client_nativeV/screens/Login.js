import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { View, ActivityIndicator } from 'react-native';

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
  WelcomeImage,
} from './../components/styles';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

// colors
const { brand, darkLight, primary, book } = Colors;

//keyboard avoiding view
// import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// API
import axios from 'axios';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();


  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null); // to clear out previous error messages
    const url = 'https://desolate-cliffs-22842.herokuapp.com/';

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          navigation.navigate('Welcome', { ...data[0] })
        }
        setSubmitting(false);
      })
      .catch(error => {
        console.log(error.JSON());
        setSubmitting(false);
        handleMessage("An error occurred. Check your network and try again.")
      })
  }

  const handleMessage = (message, type) => {
    setMessage(message);
    setMessageType(type);
  }

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        {/* <WelcomeImage resizeMode="contain" source={require('./../assets/img/img3.jpg')} /> */}
        <PageTitle>Sign In</PageTitle>
        {/* <SubTitle>Account Login</SubTitle> */}

        <Formik
          initialValues={{ mobile: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            if (values.mobile == '' || values.password == '') {
              handleMessage('Please fill all the feilds');
              setSubmitting(false);
            } else {
              handleLogin(values, setSubmitting);
            }

          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
            <StyledFormArea>
              <MyTextInput
                label="Mobile Number"
                icon="device-mobile"
                placeholder="9876543210"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                value={values.mobile}
                keyboardType="phone-pad"
              />

              <MyTextInput
                label="Password"
                icon="lock"
                placeholder="* * * * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MsgBox type={messageType}>{message}</MsgBox>
              {!isSubmitting &&
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>LOGIN</ButtonText>
                </StyledButton>}
              {isSubmitting &&
                <StyledButton disabled={true}>
                  <ActivityIndicator size='large' color={primary} />
                </StyledButton>}
              <Line />
              <StyledButton google={true} onPress={handleSubmit}>
                <ButtonText google={true}> Sign In with </ButtonText>
                <Fontisto name="google" color={primary} size={20} />
              </StyledButton>
              <ExtraView>
                <ExtraText>Don't have an account already? </ExtraText>
                <TextLink onPress={() => navigation.navigate("Signup")}>
                  <TextLinkContent>Sign Up</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>

  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
