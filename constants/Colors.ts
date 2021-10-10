import { DarkTheme } from '@react-navigation/native';
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
    text: isDark? '#fff' : '#000',
    background: isDark? '#242731' : '#fff',
    light: isDark? '#373A47' : '#fff',
    accent: isDark? '#2B2F3C' : '#f7f7f7',
    cardColor: isDark? '#485377' : '#485377',
    cardTextColor: isDark? '#8090C5' : '#485377',
  },
  orange: {
    main: '#DA5F5A',
    accent: '#BA5B58',
    light: '#FFF3E8',
  },
  blue: {
    main: '#5CA7BC',
    accent: '#61AFC5',
    light: '#E4F9FF',
  },
  green: {
    main: '#46B384',
    accent: '#49BE8C',
    light: '#E4FFF4',
  },
};
