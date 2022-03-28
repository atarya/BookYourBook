import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    Chats,
    Exchanges
} from '../Screens';
import navigationStrings from '../constants/navigationStrings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ../Screens/index is same as /Screens by default it runs index

const Tab = createBottomTabNavigator();

function Routes() {
    return (
        <NavigationContainer>

            <Tab.Navigator initialRouteName={navigationStrings.CHATS}>
                <Tab.Screen name={navigationStrings.CHATS} component={Chats} />
                <Tab.Screen name={navigationStrings.EXCHANGES} component={Exchanges} />
            </Tab.Navigator>

        </NavigationContainer >
    )
}

export default Routes;
