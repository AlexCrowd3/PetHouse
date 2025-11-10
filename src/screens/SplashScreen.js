import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../styles/Colors'
import Typography from '../styles/Typography'


const SplashScreen = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            })
        ]).start(() => {
            setTimeout(() => {
                navigation.replace('Home');
            }, 1000);
        });
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.textContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Text style={styles.appName}>PetHouse</Text>
                <Text style={styles.subtitle}>Ваш помощник для питомцев</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    appName: {
        ...Typography.title,
        color: Colors.primary,
        marginBottom: 10,
    },
    subtitle: {
        ...Typography.button,
        fontSize: 16,
        color: Colors.primary,
        opacity: 0.8,
    },
});

export default SplashScreen;