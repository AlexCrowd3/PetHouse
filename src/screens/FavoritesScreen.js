import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../styles/Colors';
import ServiceCard from '../components/ServiceCard';
import SearchBar from '../components/SearchBar';
import ServiceTabs from '../components/ServiceTabs';
import BottomNavBar from '../components/BottomNavBar';

export default function FavoritesScreen() {
    const [favorites, setFavorites] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    // Загрузка избранных услуг
    const loadFavorites = useCallback(async () => {
        try {
            const json = await AsyncStorage.getItem('favorites');
            const storedFavorites = json ? JSON.parse(json) : [];
            setFavorites(storedFavorites);
        } catch (error) {
            console.error('Ошибка при загрузке избранного:', error);
        }
    }, []);

    useEffect(() => {
        loadFavorites();
    }, [loadFavorites]);

    // Фильтрация
    const filteredFavorites = favorites.filter(item => {
        const matchesTab =
            activeTab === 'all' || item.type === activeTab.slice(0, -1);
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            (item.short_address || '').toLowerCase().includes(query);
        return matchesTab && matchesSearch;
    });

    const handleFavoriteChange = async () => {
        await loadFavorites(); // Обновляем после удаления/добавления
    };

    const EmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Список избранного пуст</Text>
            <Text style={styles.emptySubtext}>
                Добавьте услуги в избранное, чтобы они здесь отображались
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Избранное</Text>
            <Text style={styles.subtitle}>
                Все ваши любимые питомники, гостиницы и выгульщики
            </Text>

            <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Поиск по избранному..."
            />

            <ServiceTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <FlatList
                data={filteredFavorites}
                renderItem={({ item }) => (
                    <ServiceCard item={item} onFavoriteChange={handleFavoriteChange} />
                )}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<EmptyState />}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadFavorites} />
                }
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            <BottomNavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.gray,
        marginBottom: 20,
    },
    listContent: {
        paddingBottom: 80,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
        gap: 12,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    emptySubtext: {
        fontSize: 14,
        color: Colors.gray,
        textAlign: 'center',
        maxWidth: '80%',
        lineHeight: 20,
    },
});
