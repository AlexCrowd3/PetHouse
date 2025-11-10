import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Svg, Path, Rect, Circle } from 'react-native-svg';
import Colors from '../styles/Colors';

const ServiceTabs = ({ activeTab, onTabChange }) => {
    const tabs = [
        {
            key: 'all',
            label: 'Все',
            icon: (
                <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M3 6h18M3 12h18M3 18h18"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            ),
        },
        {
            key: 'kennels',
            label: 'Питомники',
            icon: (
                <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <Path d="M9 21V12h6v9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
            ),
        },
        {
            key: 'hotels',
            label: 'Гостиницы',
            icon: (
                <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                    <Rect x="3" y="8" width="18" height="13" rx="1.5" strokeWidth={2} />
                    <Path d="M7 11h2M11 11h2M15 11h2" strokeWidth={2} strokeLinecap="round" />
                </Svg>
            ),
        },
        {
            key: 'walkers',
            label: 'Выгульщики',
            icon: (
                <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                    <Circle cx="12" cy="4" r="2" strokeWidth={2} />
                    <Path
                        d="M7 22l3-7 3 2 1.5 5M5 14l5-3 2 1 3 2"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            ),
        },
    ];

    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                        <TouchableOpacity
                            key={tab.key}
                            style={[styles.tab, isActive && styles.activeTab]}
                            onPress={() => onTabChange(tab.key)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.iconWrapper}>
                                {React.cloneElement(tab.icon, {
                                    stroke: isActive ? Colors.primary : Colors.gray,
                                })}
                            </View>
                            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 16,
    },
    scrollContent: {
        paddingHorizontal: 8,
        gap: 10,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        minWidth: 120,
    },
    activeTab: {
        backgroundColor: Colors.primary + '26',
    },
    iconWrapper: {
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.gray,
    },
    activeTabText: {
        color: Colors.textPrimary,
        fontWeight: '600',
    },
});

export default ServiceTabs;
