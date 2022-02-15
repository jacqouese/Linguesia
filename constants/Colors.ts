import { Appearance } from 'react-native';

const colorScheme = Appearance.getColorScheme();

export var isDark = false;

if (colorScheme == 'dark')
  isDark = true;


const tintColorLight = '#1E7F99';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    lightText: '#707070',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    lightText: '#707070',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  theme: {
    text: isDark? '#F1F1F1' : '#000',
    textLight: isDark? '#CACACA' : '#9C9C9C',
    background: isDark? '#1A1B1C' : '#fff',
    light: isDark? '#2F343A' : '#fff',
    accent: isDark? '#23282D' : '#f7f7f7',
    cardColor: isDark? '#394056' : '#5C99D3',
    cardTextColor: isDark? '#8090C5' : '#485377',
  },
  orange: {
    main: isDark? '#E0823D' : '#F5A462',
    accent: '#BA5B58',
    light: '#FFF3E8',
  },
  blue: {
    main: isDark? '#5CA7BC' : '#5CA7BC',
    accent: '#61AFC5',
    light: '#E4F9FF',
  },
  green: {
    main: isDark? '#46B384' : '#46B384',
    accent: '#49BE8C',
    light: '#E4FFF4',
  },
};
