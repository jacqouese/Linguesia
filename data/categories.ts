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
        color: Colors.green,
        images: require('../assets/images/german.png'),
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
        title: 'Fragmenty',
        subtitle: 'Odkryj fragmenty tekstów',
        color: Colors.blue,
        images: require('../assets/images/openbook.png'),
        subcategory: [
            {
                id: '1',
                title: 'A1',
                subtitle: 'subtitle',
                image: require('../assets/images/books/1book.png'),
            },
            {
                id: '2',
                title: 'A2',
                subtitle: 'subtit22le',
                image: require('../assets/images/books/2books.png'),
            },
            {
                id: '3',
                title: 'B1',
                subtitle: 'subtit22le',
                image: require('../assets/images/books/3books.png'),
            },
            {
                id: '4',
                title: 'B2',
                subtitle: 'subtit22le',
                image: require('../assets/images/books/5books.png'),
            },
        ]
    },
];

export default categories;