import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { View } from 'react-native';

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
  TextLinkContent
} from './../components/styles';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

// colors
const { brand, darkLight, primary, book } = Colors;

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        {/* <PageLogo resizeMode="cover" source={require('./../assets/img/img1.jpg')} /> */}
        <PageTitle>Sign In</PageTitle>
        {/* <SubTitle>Account Login</SubTitle> */}

        <Formik
          initialValues={{ mobile: '', password: '' }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
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
              <MsgBox>...</MsgBox>
              <StyledButton onPress={handleSubmit}>
                <ButtonText>LOGIN</ButtonText>
              </StyledButton>
              <Line />
              <StyledButton google={true} onPress={handleSubmit}>
                <Fontisto name="google" color={primary} size={20} />
                {/* <ButtonText google={true}> SIGN IN with Google </ButtonText> */}
              </StyledButton>
              <ExtraView>
                <ExtraText>Don't have an account already?</ExtraText>
                <TextLink>
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
