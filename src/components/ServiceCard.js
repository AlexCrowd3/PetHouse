import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../styles/Colors';

const ServiceCard = ({ item, onFavoriteChange }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    // Проверяем, есть ли элемент в избранном
    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const json = await AsyncStorage.getItem('favorites');
                const favorites = json ? JSON.parse(json) : [];
                const exists = favorites.some(fav => fav.id === item.id);
                setIsFavorite(exists);
            } catch (error) {
                console.error('Ошибка при загрузке избранного:', error);
            }
        };
        checkFavorite();
    }, [item]);

    // Добавление/удаление из избранного
    const toggleFavorite = async () => {
        try {
            const json = await AsyncStorage.getItem('favorites');
            let favorites = json ? JSON.parse(json) : [];

            const exists = favorites.some(fav => fav.id === item.id);
            let updated;

            if (exists) {
                // Удаляем
                updated = favorites.filter(fav => fav.id !== item.id);
                setIsFavorite(false);
            } else {
                // Добавляем
                updated = [...favorites, item];
                setIsFavorite(true);
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(updated));
            if (onFavoriteChange) onFavoriteChange(); // Обновляем экран избранного

        } catch (error) {
            console.error('Ошибка при обновлении избранного:', error);
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
        if (item.price_per_hour || item.pricePerHour) return `${item.price_per_hour || item.pricePerHour} ₽/час`;
        if (item.price_per_night || item.pricePerNight) return `${item.price_per_night || item.pricePerNight} ₽/ночь`;
        if (item.price_range || item.priceRange) return item.price_range || item.priceRange;
        return '';
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.typeBadge}>
                    <Text style={styles.typeText}>{getTypeText(item.type)}</Text>
                </View>

                <TouchableOpacity onPress={toggleFavorite}>
                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M12 21s-7-5.5-10-10c-2.5-4 1-9 6-9 2.5 0 4 2 4 2s1.5-2 4-2c5 0 8.5 5 6 9-3 4.5-10 10-10 10z"
                            strokeWidth={2}
                            fill={isFavorite ? Colors.red : 'none'}
                            stroke={isFavorite ? Colors.red : Colors.gray}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </TouchableOpacity>
            </View>

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.footer}>
                <Text style={styles.address}>{item.short_address || item.shortAddress}</Text>
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
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    typeBadge: {
        backgroundColor: Colors.primary + '20',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    typeText: {
        fontSize: 13,
        color: Colors.primary,
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
