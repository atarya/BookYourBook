//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';

// create a component
const KeyboardAvoidingWrapper = ({ children }) => {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};


//make this component available to the app
export default KeyboardAvoidingWrapper;

// The APP is working fine without even considering this
