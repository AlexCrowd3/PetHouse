import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import Colors from '../styles/Colors';

const ServiceCard = ({ item, onToggleFavorite }) => {

    const getTypeIcon = (type) => {
        switch (type) {
            case 'kennel': // питомник
                return (
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"
                            stroke={Colors.primary}
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M9 21V12h6v9"
                            stroke={Colors.primary}
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                );
            case 'hotel': // гостиница
                return (
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M3 21V10a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v11"
                            stroke={Colors.primary}
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M3 21h18M6 21V13h4v8M14 21v-5h4v5"
                            stroke={Colors.primary}
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                );
            case 'walker': // выгульщик
                return (
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M16 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM6 8l3 1.5 1.5 4 3 1 1.5 6"
                            stroke={Colors.primary}
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M4 19l4-7"
                            stroke={Colors.primary}
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                );
            default:
                return (
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 14v-4M12 8h.01"
                            stroke={Colors.primary}
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                );
        }
    };

    const getTypeText = (type) => {
        switch (type) {
            case 'kennel': return 'Питомник';
            case 'hotel': return 'Гостиница';
            case 'walker': return 'Выгульщик';
            default: return 'Услуга';
        }
    };

    const renderPrice = () => {
        if (item.pricePerHour) return `${item.pricePerHour} ₽/час`;
        if (item.pricePerNight) return `${item.pricePerNight} ₽/ночь`;
        if (item.priceRange) return item.priceRange;
        return '';
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.typeBadge}>
                    {getTypeIcon(item.type)}
                    <Text style={styles.typeText}>{getTypeText(item.type)}</Text>
                </View>

                <TouchableOpacity onPress={() => onToggleFavorite(item.id)}>
                    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M12 21s-6-4.35-9-8.5S3.5 3 7.5 3a4.5 4.5 0 0 1 4.5 3.5A4.5 4.5 0 0 1 16.5 3c4 0 6.5 3.5 4.5 9.5S12 21 12 21z"
                            fill={item.isFavorite ? Colors.red : 'none'}
                            stroke={item.isFavorite ? Colors.red : Colors.gray}
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </TouchableOpacity>
            </View>

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.footer}>
                <Text style={styles.address}>{item.shortAddress}</Text>
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingRow}>
                        <Svg width={14} height={14} viewBox="0 0 24 24" fill={Colors.orange}>
                            <Path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.401 8.171L12 18.896l-7.335 3.869 1.401-8.171L.132 9.21l8.2-1.192z" />
                        </Svg>
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                    {renderPrice() && <Text style={styles.price}>{renderPrice()}</Text>}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.background,
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: Colors.lightGray,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    typeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary + '20',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    typeText: {
        fontSize: 13,
        color: Colors.primary,
        marginLeft: 6,
        fontWeight: '500',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: Colors.gray,
        marginBottom: 12,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    address: {
        fontSize: 13,
        color: Colors.lightGray,
    },
    ratingContainer: {
        alignItems: 'flex-end',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    ratingText: {
        fontSize: 14,
        color: Colors.orange,
        marginLeft: 4,
        fontWeight: '500',
    },
    price: {
        fontSize: 13,
        color: Colors.textPrimary,
        opacity: 0.7,
    },
});

export default ServiceCard;
