import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import Colors from '../styles/Colors';
import ServiceTabs from '../components/ServiceTabs';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';
import { Svg, Path } from 'react-native-svg';
import BottomNavBar from '../components/BottomNavBar';
import { supabase } from '../service/supabase';

export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const intervalRef = useRef(null);

    // 🔹 Получаем все данные из Supabase
    const fetchServices = async () => {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('rating', { ascending: false });

            if (error) {
                console.error('Ошибка при загрузке данных из Supabase:', error);
            } else if (data) {
                setServices((prev) => {
                    // Если данные изменились — обновляем
                    const changed = JSON.stringify(prev) !== JSON.stringify(data);
                    return changed ? data : prev;
                });
            }
        } catch (err) {
            console.error('Ошибка запроса Supabase:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices(); // первый запуск

        // 🔁 автообновление каждые 2 секунды
        intervalRef.current = setInterval(fetchServices, 2000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    // 🔹 Фильтрация данных
    const filteredServices = services.filter((s) => {
        let matchesType = true;
        let matchesSearch = true;

        if (activeTab !== 'all') {
            matchesType = s.type === activeTab.slice(0, -1); // kennels → kennel
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            matchesSearch =
                s.name.toLowerCase().includes(q) ||
                s.description.toLowerCase().includes(q) ||
                s.short_address.toLowerCase().includes(q);
        }

        return matchesType && matchesSearch;
    });

    // 🔹 Изменение "избранного" (локально + Supabase)
    const handleToggleFavorite = async (id, currentValue) => {
        // обновляем локально для отзывчивости
        setServices(prev =>
            prev.map(s => (s.id === id ? { ...s, is_favorite: !s.is_favorite } : s))
        );

        // синхронизируем с Supabase
        const { error } = await supabase
            .from('services')
            .update({ is_favorite: !currentValue })
            .eq('id', id);

        if (error) {
            console.error('Ошибка обновления избранного:', error);
        }
    };

    const EmptyState = () => (
        <View style={styles.emptyState}>
            <Svg width={70} height={70} viewBox="0 0 24 24" stroke={Colors.gray} strokeWidth={1.6} fill="none">
                <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <Path d="M9 9h.01M15 9h.01M8 15c1.333 1.333 2.667 2 4 2s2.667-.667 4-2" strokeLinecap="round" />
            </Svg>
            <Text style={styles.emptyStateText}>Ничего не найдено</Text>
            <Text style={styles.emptyStateSubtext}>
                Попробуйте изменить запрос или выбрать другую категорию
            </Text>
        </View>
    );

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>PetHouse</Text>
            <Text style={styles.subtitle}>Найдите лучшие услуги для вашего питомца</Text>

            <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Поиск питомников, гостиниц, выгульщиков..."
            />

            <ServiceTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <FlatList
                data={filteredServices}
                renderItem={({ item }) => (
                    <ServiceCard
                        item={item}
                        onToggleFavorite={() => handleToggleFavorite(item.id, item.is_favorite)}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
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
        fontSize: 30,
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
        gap: 10,
    },
    emptyStateText: {
        fontSize: 18,
        color: Colors.textPrimary,
        fontWeight: '600',
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: Colors.gray,
        textAlign: 'center',
        maxWidth: '80%',
        lineHeight: 20,
    },
});