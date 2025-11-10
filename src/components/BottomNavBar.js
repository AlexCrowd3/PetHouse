import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Colors from '../styles/Colors';
import Svg, { Path } from 'react-native-svg';

const BottomNavBar = ({ onTabPress }) => {
    const navigation = useNavigation();

    const currentRouteName = useNavigationState((state) => {
        const route = state.routes[state.index];
        return route.name;
    });

    const tabs = [
        {
            id: 'Home',
            label: 'Главная',
            icon: (color) => (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M3 12L12 3l9 9v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9z"
                        stroke={color}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>

            ),
        },
        {
            id: 'Favorites',
            label: 'Избранное',
            icon: (color) => (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M12 21s-7-5.5-10-10c-2.5-4 1-9 6-9 2.5 0 4 2 4 2s1.5-2 4-2c5 0 8.5 5 6 9-3 4.5-10 10-10 10z"
                        stroke={color}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </Svg>
            ),
        },
    ];

    const handleTabPress = (tabId) => {
        if (onTabPress) onTabPress(tabId);
        if (tabId !== currentRouteName) {
            navigation.navigate(tabId);
        }
    };

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = currentRouteName === tab.id;
                const color = isActive ? Colors.textPrimary : Colors.textSecondary;

                return (
                    <TouchableOpacity
                        key={tab.id}
                        style={styles.tab}
                        onPress={() => handleTabPress(tab.id)}
                        activeOpacity={0.7}
                    >
                        {tab.icon(color)}
                        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        height: 90,
        backgroundColor: Colors.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 20,
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.textSecondary,
        marginTop: 4,
        textAlign: 'center',
    },
    activeTabText: {
        color: Colors.textPrimary,
        fontWeight: '600',
    },
});

export default BottomNavBar;
