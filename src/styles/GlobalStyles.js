import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Typography from './Typography';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black,
    },
});