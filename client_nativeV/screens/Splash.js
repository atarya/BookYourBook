
import { StatusBar } from 'expo-status-bar';

import { View, StyleSheet } from 'react-native';

import {
    PageLogo
} from './../components/styles';



const Splash = () => {

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <PageLogo resizeMode="cover" source={require('./../assets/img/img3.jpg')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ef874a',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Splash;
