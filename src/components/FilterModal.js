// src/components/FilterModal.js
import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { ThemeContext } from '../context/ThemeContext';

const DEFAULT_FILTERS = {
    workTime: ['Открыто сейчас'],
    network: ['Просто'],
    distance: 2,
    rating: '4.7',
    cost: ['Платно'],
};

const { width, height } = Dimensions.get('window');

export default function FilterModal({ isVisible, onClose }) {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const { theme } = useContext(ThemeContext);
    const styles = getStyles(theme);

    useEffect(() => {
        const loadFilters = async () => {
            try {
                const saved = await AsyncStorage.getItem('@filters');
                if (saved) setFilters(JSON.parse(saved));
            } catch (e) {
                console.warn('Failed to load filters', e);
            }
        };
        loadFilters();
    }, []);

    const saveFilters = async (newFilters) => {
        setFilters(newFilters);
        try {
            await AsyncStorage.setItem('@filters', JSON.stringify(newFilters));
        } catch (e) {
            console.warn('Failed to save filters', e);
        }
    };

    const toggleArrayValue = (key, value) => {
        const arr = filters[key] || [];
        const newArr = arr.includes(value)
            ? arr.filter((v) => v !== value)
            : [...arr, value];
        saveFilters({ ...filters, [key]: newArr });
    };

    return (
        <Modal
            isVisible={isVisible}
            style={styles.modal}
            backdropOpacity={0.3}
            useNativeDriver
            useNativeDriverForBackdrop
            swipeDirection="down"
            onSwipeComplete={onClose}
            propagateSwipe
            swipeThreshold={60}
        >
            <View style={styles.container}>
                {/* Верхняя зона с ручкой */}
                <View style={styles.dragArea}>
                    <View style={styles.dragHandle} />
                </View>

                <Text style={styles.title}>Фильтры</Text>

                {/* Скроллим только внутри контента */}
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.section}>Время работы</Text>
                    <View style={styles.row}>
                        {['Открыто сейчас', 'Круглосуточно'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.btn,
                                    filters.workTime.includes(option) && styles.btnActive,
                                ]}
                                onPress={() => toggleArrayValue('workTime', option)}
                            >
                                <Text
                                    style={[
                                        styles.btnText,
                                        filters.workTime.includes(option) && styles.btnTextActive,
                                    ]}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.section}>Сети</Text>
                    <View style={styles.column}>
                        {['Просто', 'Точка кипения', 'Ещё'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={styles.radioRow}
                                onPress={() => saveFilters({ ...filters, network: [option] })}
                            >
                                <View
                                    style={[
                                        styles.radioOuter,
                                        filters.network.includes(option) && styles.radioOuterActive,
                                    ]}
                                >
                                    {filters.network.includes(option) && (
                                        <View style={styles.radioInner} />
                                    )}
                                </View>
                                <Text style={styles.radioText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.section}>Расстояние</Text>
                    <Slider
                        minimumValue={0}
                        maximumValue={5}
                        step={0.1}
                        value={filters.distance}
                        onValueChange={(value) =>
                            saveFilters({ ...filters, distance: value })
                        }
                        minimumTrackTintColor="#7F3FFF"
                        maximumTrackTintColor="#ccc"
                        style={{ paddingHorizontal: 18, width: width - 32 }}
                    />
                    <View style={styles.sliderLabels}>
                        <Text style={{ color: theme.textPrimary }}>{filters.distance.toFixed(1)} км</Text>
                    </View>

                    <Text style={styles.section}>Рейтинг</Text>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[
                                styles.btn,
                                filters.rating === '4.7' && styles.btnActive,
                            ]}
                            onPress={() => saveFilters({ ...filters, rating: '4.7' })}
                        >
                            <Text
                                style={[
                                    styles.btnText,
                                    filters.rating === '4.7' && styles.btnTextActive,
                                ]}
                            >
                                Только выше 4.7
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.section}>Стоимость</Text>
                    <View style={styles.row}>
                        {['Платно', 'Бесплатно'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.btn,
                                    filters.cost.includes(option) && styles.btnActive,
                                ]}
                                onPress={() => toggleArrayValue('cost', option)}
                            >
                                <Text
                                    style={[
                                        styles.btnText,
                                        filters.cost.includes(option) && styles.btnTextActive,
                                    ]}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.bottom}>
                    <TouchableOpacity
                        style={styles.clearBtn}
                        onPress={() => saveFilters(DEFAULT_FILTERS)}
                    >
                        <Text style={styles.clearText}>Сбросить всё</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.applyBtn} onPress={onClose}>
                        <Text style={styles.applyText}>Применить</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const getStyles = (theme) =>
    StyleSheet.create({
        modal: {
            justifyContent: 'flex-end',
            margin: 0,
        },
        container: {
            backgroundColor: theme.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: height * 0.9,
            overflow: 'hidden',
        },
        dragArea: {
            alignItems: 'center',
            paddingVertical: 12,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        },
        dragHandle: {
            width: 60,
            height: 5,
            borderRadius: 3,
            backgroundColor: '#ccc',
            marginBottom: 6,
        },
        title: {
            fontSize: 18,
            fontWeight: '600',
            color: theme.textPrimary,
            textAlign: 'center',
            marginBottom: 10,
        },
        section: {
            color: theme.textSecondary,
            marginTop: 15,
            marginBottom: 10,
            fontSize: 14,
            paddingHorizontal: 20,
        },
        row: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 20,
        },
        column: {
            flexDirection: 'column',
            paddingHorizontal: 20,
        },
        btn: {
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 20,
            backgroundColor: theme.inputBackground,
            marginRight: 10,
            marginBottom: 10,
        },
        btnActive: { backgroundColor: '#7F3FFF' },
        btnText: { color: theme.textPrimary, fontSize: 14 },
        btnTextActive: { color: '#fff' },
        radioRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        radioOuter: {
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#555',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
        },
        radioOuterActive: { borderColor: '#7F3FFF' },
        radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#7F3FFF' },
        radioText: { color: theme.textPrimary, fontSize: 14 },
        sliderLabels: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
        },
        bottom: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            paddingTop: 10,
            paddingBottom: 60,
            backgroundColor: theme.background,
        },
        clearBtn: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: theme.inputBackground,
            borderRadius: 20,
        },
        clearText: { color: theme.textPrimary },
        applyBtn: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: '#7F3FFF',
            borderRadius: 20,
        },
        applyText: { color: '#fff' },
    });
