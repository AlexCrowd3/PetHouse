import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';
import ServiceCard from '../components/ServiceCard';
import SearchBar from '../components/SearchBar';
import ServiceTabs from '../components/ServiceTabs';
import { allServices } from '../data/mockData';
import BottomNavBar from '../components/BottomNavBar';

export default function FavoritesScreen() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        let filtered = allServices.filter(s => s.isFavorite);

        if (activeTab !== 'all') {
            filtered = filtered.filter(s => s.type === activeTab.slice(0, -1));
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(s =>
                s.name.toLowerCase().includes(query) ||
                s.description.toLowerCase().includes(query) ||
                s.shortAddress.toLowerCase().includes(query)
            );
        }

        setFavorites(filtered);
    }, [activeTab, searchQuery]);

    const handleToggleFavorite = (id) => {
        setFavorites(prev =>
            prev.map(s =>
                s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
            )
        );
    };

    const EmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Список избранного пуст</Text>
            <Text style={styles.emptySubtext}>Добавьте услуги в избранное, чтобы они здесь отображались</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Избранное</Text>
            <Text style={styles.subtitle}>Все ваши любимые питомники, гостиницы и выгульщики</Text>

            <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Поиск по избранному..."
            />

            <ServiceTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <FlatList
                data={favorites}
                renderItem={({ item }) => (
                    <ServiceCard item={item} onToggleFavorite={handleToggleFavorite} />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyState />}
                contentContainerStyle={styles.listContent}
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
