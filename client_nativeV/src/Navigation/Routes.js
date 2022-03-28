import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    Home,
    Profile,
    Explore,
} from '../Screens';
import navigationStrings from '../constants/navigationStrings';

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={navigationStrings.HOME} screenOptions={{ headerShown: false }}>
                <Stack.Screen options={{ title: 'Book Your Book' }} name={navigationStrings.HOME} component={Home} />
                <Stack.Screen name={navigationStrings.PROFILE} component={Profile} />
                <Stack.Screen name={navigationStrings.EXPLORE} component={Explore} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default Routes;
