import Colors from '../constants/Colors';

const categories = [
    {
        id: '1',
        title: 'Fiszki',
        subtitle: 'Ucz się przy pomocy fiszek',
        color: Colors.orange,
        images: require('../assets/images/flashcards.png'),
        subcategory: [
            {
                id: '1',
                title: 'Owoce i warzywa',
                subtitle: 'subtitle',
                image: require('../assets/images/fruits.png'),
            },
            {
                id: '2',
                title: 'Ubrania',
                subtitle: 'subtit22le',
                image: require('../assets/images/shirt.png'),
            },
            {
                id: '3',
                title: 'Czasowniki 1',
                subtitle: 'subtit22le',
                image: require('../assets/images/running.png'),
            },
            {
                id: '4',
                title: 'Pojazdy',
                subtitle: 'subtit22le',
                image: require('../assets/images/car.png'),
            },
            {
                id: '5',
                title: 'Dom',
                subtitle: 'subtit22le',
                image: require('../assets/images/house.png'),
            },
        ]
    },
    {
        id: '2',
        title: 'Rodzajniki',
        subtitle: 'die der das',
        color: Colors.blue,
        images: require('../assets/images/translate.png'),
        subcategory: [
            {
                id: '1',
                title: 'Owoce i warzywa',
                subtitle: 'subtitle',
                image: require('../assets/images/fruits.png'),
            },
            {
                id: '2',
                title: 'Ubrania',
                subtitle: 'subtit22le',
                image: require('../assets/images/shirt.png'),
            },
            {
                id: '3',
                title: 'Czasowniki 1',
                subtitle: 'subtit22le',
                image: require('../assets/images/running.png'),
            },
            {
                id: '4',
                title: 'Pojazdy',
                subtitle: 'subtit22le',
                image: require('../assets/images/car.png'),
            },
            {
                id: '5',
                title: 'Dom',
                subtitle: 'subtit22le',
                image: require('../assets/images/house.png'),
            },
        ]
    },
    {
        id: '3',
        title: 'Nieregularne',
        subtitle: 'Formy czasowników nieregularnych',
        color: Colors.green,
        images: require('../assets/images/class.png'),
        subcategory: [
            {
                id: '1',
                title: 'Czynności',
                subtitle: 'Czynności 1',
                image: require('../assets/images/headphones.png'),
            },
            {
                id: '2',
                title: 'Czynności 2',
                subtitle: 'Czynności 2',
                image: require('../assets/images/shirt.png'),
            },
            {
                id: '3',
                title: 'Sport',
                subtitle: 'Czasowniki sportowe',
                image: require('../assets/images/running.png'),
            },
            {
                id: '4',
                title: 'Czyności domowe',
                subtitle: 'Czyności wyknowane w domu',
                image: require('../assets/images/house.png'),
            },
        ]
    },
];

export default categories;