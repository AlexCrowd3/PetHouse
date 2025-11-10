import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import Colors from '../styles/Colors';

const SearchBar = ({ value, onChangeText, placeholder = "Поиск питомников, гостиниц..." }) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchWrapper}>
                <View style={styles.iconContainer}>
                    <Svg
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <Path
                            d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                            stroke={Colors.gray}
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </View>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.gray}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        paddingHorizontal: 12,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: Colors.textPrimary,
        fontSize: 16,
        paddingVertical: 10,
    },
});

export default SearchBar;
