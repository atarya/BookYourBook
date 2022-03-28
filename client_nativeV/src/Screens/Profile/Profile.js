//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import styles from './styles';
import navigationStrings from '../../constants/navigationStrings';
import HeaderComp from '../../Components/HeaderComp';
import { SafeAreaView } from 'react-native-safe-area-context';



// create a component
const Profile = ({ navigation, route }) => {
    const { title } = route.params

    const goToScreen = () => {
        navigation.navigate(navigationStrings.EXPLORE)
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <HeaderComp text='Profile Screen' />

                <View style={styles.content}>
                    <Text> Below is the Params Data</Text>
                    <Text style={styles.dataBox}>{title}</Text>

                    <Text>THIS IS Profile Page</Text>
                    <Button onPress={goToScreen} title='GO to Explore page' />

                </View>
            </SafeAreaView >
        </View >
    );
};


//make this component available to the app
export default Profile;
