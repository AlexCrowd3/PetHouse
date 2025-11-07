import { Platform } from 'react-native';

const Fonts = {
    Display: {
        Bold: Platform.select({
            ios: 'SFProDisplay-Bold',
            android: 'SF-Pro-Display-Bold',
        }),
        Semibold: Platform.select({
            ios: 'SFProDisplay-Semibold',
            android: 'SF-Pro-Display-Semibold',
        }),
        Medium: Platform.select({
            ios: 'SFProDisplay-Medium',
            android: 'SF-Pro-Display-Medium',
        }),
        Regular: Platform.select({
            ios: 'SFProDisplay-Regular',
            android: 'SF-Pro-Display-Regular',
        }),
    },
    Text: {
        Semibold: Platform.select({
            ios: 'SFProText-Semibold',
            android: 'SF-Pro-Text-Semibold',
        }),
        Regular: Platform.select({
            ios: 'SFProText-Regular',
            android: 'SF-Pro-Text-Regular',
        }),
    },
};

const Typography = {
    title: {
        fontFamily: Fonts.Display.Bold,
        fontSize: 24,
        lineHeight: 28,
        fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    },
    button: {
        fontFamily: Fonts.Display.Bold,
        fontSize: 20,
        lineHeight: 22,
        fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    },
    body_text: {
        fontFamily: Fonts.Display.Medium,
        fontSize: 16,
        lineHeight: 28,
        fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
    },
    subtitle: {
        fontFamily: Fonts.Display.Medium,
        fontSize: 18,
        lineHeight: 24,
        fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
    },
    caption_primary: {
        fontFamily: Fonts.Display.Regular,
        fontSize: 14,
        lineHeight: 24,
        fontWeight: 'normal',
    },
    caption_secondary: {
        fontFamily: Fonts.Display.Regular,
        fontSize: 14,
        lineHeight: 24,
        fontWeight: 'normal',
    },
    subheadline_semibold: {
        fontFamily: Fonts.Text.Semibold,
        fontSize: 20,
        lineHeight: 28,
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
    },
    subheadline_regular: {
        fontFamily: Fonts.Text.Regular,
        fontSize: 20,
        lineHeight: 28,
        fontWeight: 'normal',
    },
};

export default Typography;