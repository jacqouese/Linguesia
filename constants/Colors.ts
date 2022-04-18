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
    text: isDark? '#F1F1F1' : '#1a1a1a',
    textLight: isDark? '#CACACA' : '#9C9C9C',
    background: isDark? '#1A1B1C' : '#fff',
    light: isDark? '#2F343A' : '#fff',
    accent: isDark? '#23282D' : '#f7f7f7',
    cardColor: isDark? '#394056' : '#5C99D3',
    cardTextColor: isDark? '#8090C5' : '#485377',
    green: isDark? '#46B384' : '#46B384',
    red: isDark? '#ba6858' : '#ff6363',
  },
  orange: {
    main: isDark? '#E0823D' : '#F5A462',
    accent: isDark? '#ba6858' : '#f7ae72',
    light: isDark? '#bf6c5c' : '#fce6d2',
  },
  blue: {
    main: isDark? '#5CA7BC' : '#5CA7BC',
    accent: '#61AFC5',
    light: isDark? '#61AFC5' : '#E4F9FF',
  },
  green: {
    main: isDark? '#46B384' : '#46B384',
    accent: '#49BE8C',
    light: isDark? '#49BE8C' : '#E4FFF4',
  },
};
