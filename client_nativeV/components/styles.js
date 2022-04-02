// import styled from 'styled-components';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components/native';

const StatusBarHeight = Constants.statusBarHeight;

// colors
export const Colors = {
  primary: '#ffffff',
  secondary: '#b8c5df',
  tertiary: '#1F2937',
  darkLight: '#9CA3AF',
  brand: '#6D28D9',
  green: '#10B981',
  red: '#EF4444',
  book: '#ef874a',
};

const { primary, secondary, tertiary, darkLight, brand, green, red, book } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${primary};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding : 25px;
  padding-top: 10px;
  align-items: center;
`


export const PageLogo = styled.Image`
  width: 300;
  height: 300;
  resizeMode: contain;
`;

export const Avatar = styled.Image`
width: 90px;
height : 90px;
margin : auto;
border-radius : 50px;
border-width: 2px;
border-color : ${secondary}
margin-bottom : 10px;
margin-top: 10px;
`;


export const WelcomeImage = styled.Image`
  height : 40%;
  min-width: 10%;

`;

export const PageTitle = styled.Text`
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  color: grey;
  padding: 10px;

  ${(props) => props.welcome && `
    margin-bottom : 35px;
  `}
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: bold;
  color: ${tertiary};
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

// using it for eye icon
export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${book};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  

  ${(props) => props.google == true && `
    background-color: ${'#3e7ee8'};
    flex-direction: row;
    justify-content: center;
  `}
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 14px;
  ${(props) => props.google == true && `
    padding: 5px;
`}
`;


export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;

`;


export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`;
export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-items: center;
    color: ${tertiary};
    font-size: 15px;
`;


export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${brand};

`;

export const DatePick = styled.TextInput`
  background-color: ${secondary};
  padding: 10px;
  padding-left: 45px;
  padding-right: 2px;
  border-radius: 5px;
  font-size: 14px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 5px;
  color: ${tertiary};
  width: 110%;
`;





// export const Text