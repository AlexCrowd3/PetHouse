import * as Font from 'expo-font';

export const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'SF-Pro-Display-Bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
      'SF-Pro-Display-Semibold': require('../assets/fonts/SF-Pro-Display-Semibold.otf'),
      'SF-Pro-Display-Medium': require('../assets/fonts/SF-Pro-Display-Medium.otf'),
      'SF-Pro-Display-Regular': require('../assets/fonts/SF-Pro-Display-Regular.otf'),
      'SF-Pro-Text-Semibold': require('../assets/fonts/SF-Pro-Text-Semibold.otf'),
      'SF-Pro-Text-Regular': require('../assets/fonts/SF-Pro-Text-Regular.otf'),
    });
  } catch (error) {
    console.log('Font loading error:', error);
  }
};