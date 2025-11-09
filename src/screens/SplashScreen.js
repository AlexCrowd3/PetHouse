import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const diagonal = Math.sqrt(width * width + height * height);

const SplashScreen = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigation = useNavigation();
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [showImage, setShowImage] = useState(false);
    const styles = getStyles(theme);

    useEffect(() => {
        Animated.timing(scaleAnim, {
            toValue: diagonal / 50,
            duration: 2000,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start(() => {
            setShowImage(true);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    navigation.replace('Home');
                }, 1500);
            });
        });
    }, []);

    return (
        <View style={styles.container}>
            {/* Круг — расширяющаяся заливка */}
            <Animated.View
                style={[
                    styles.circle,
                    {
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            />

            {showImage && (
                <Animated.Image
                    source={require('../assets/images/splashImage.png')}
                    style={[styles.image, { opacity: fadeAnim }]}
                />
            )}
        </View>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.black,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.green,
    },
    image: {
        position: 'absolute',
        width: '60%',
        resizeMode: 'contain',
    },
});

export default SplashScreen;
