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
  TextLinkContent,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from './../components/styles';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

// colors
const { brand, darkLight, primary } = Colors;

const Welcome = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <>
      <StatusBar style="dark" />
      <InnerContainer>
        <WelcomeImage resizeMode="contain" source={require('./../assets/img/img3.jpg')} />
        <WelcomeContainer>
          <PageTitle welcome={true}>Home Page</PageTitle>
          <SubTitle welcome={true}>User Name </SubTitle>
          <SubTitle welcome={true}>user@email.id </SubTitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={require('./../assets/img/img2.jpg')} />

            <Line />

            <StyledButton onPress={() => navigation.navigate("Login")}>
              <ButtonText>Log Out</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
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

export default Welcome;
