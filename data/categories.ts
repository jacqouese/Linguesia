import Colors from '../constants/Colors';

const categories = [
    {
        id: '1',
        title: 'Fiszki',
        subtitle: 'Ucz się przy pomocy fiszek',
        color: Colors.orange,
        images: require('../assets/images/flashcards.png')
    },
    {
        id: '2',
        title: 'Rodzajniki',
        subtitle: 'die der das',
        color: Colors.blue,
        images: require('../assets/images/translate.png')
    },
    {
        id: '3',
        title: 'Nieregularne',
        subtitle: 'Formy czasowników nieregularnych',
        color: Colors.green,
        images: require('../assets/images/class.png')
    },
];

export default categories;