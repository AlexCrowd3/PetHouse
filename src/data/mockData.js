export const mockData = {
    kennels: [
        {
            id: '1',
            name: 'Умный пес',
            type: 'kennel',
            description: 'Современный питомник с профессиональными кинологами',
            shortAddress: 'м. ВДНХ',
            rating: 4.8,
            priceRange: 'средний',
            isFavorite: false
        },
        {
            id: '2',
            name: 'Верный друг',
            type: 'kennel',
            description: 'Питомник для собак всех пород с большой территорией',
            shortAddress: 'м. Щукинская',
            rating: 4.5,
            priceRange: 'бюджетный',
            isFavorite: true
        }
    ],
    hotels: [
        {
            id: '3',
            name: 'Гав Отель',
            type: 'hotel',
            description: 'Комфортная гостиница для собак с индивидуальными вольерами',
            shortAddress: 'м. Тёплый Стан',
            rating: 4.9,
            pricePerNight: 1500,
            isFavorite: false
        },
        {
            id: '4',
            name: 'Dogville',
            type: 'hotel',
            description: 'Премиум отель для собак с spa-комплексом',
            shortAddress: 'м. Крылатское',
            rating: 4.7,
            pricePerNight: 3000,
            isFavorite: false
        }
    ],
    walkers: [
        {
            id: '5',
            name: 'Анна К.',
            type: 'walker',
            description: 'Опытный выгульщик, специализируюсь на крупных породах',
            shortAddress: 'ЦАО',
            rating: 4.6,
            pricePerHour: 800,
            isFavorite: true
        },
        {
            id: '6',
            name: 'Максим Петров',
            type: 'walker',
            description: 'Выгул собак любых размеров, есть опыт с щенками',
            shortAddress: 'СВАО',
            rating: 4.3,
            pricePerHour: 600,
            isFavorite: false
        }
    ]
};

export const allServices = [
    ...mockData.kennels,
    ...mockData.hotels,
    ...mockData.walkers
];