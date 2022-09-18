import {DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import {MD3DarkTheme} from 'react-native-paper';

const colors = {
  primary: '#2196f3',
  background: '#111936',
  card: '#0b111e',
  disabled: '#41516ca3',
  outline: '#2195f344',
  text: '#fff',
  secondary: '#7c4dff',
  tertiary: '#9362b3',
  error: '#f13a59',
  success: '#51a951',
  backdrop: '#080c1dc8',
};

const PaperDarkTheme = {
  ...MD3DarkTheme,
  roundness: 8,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    background: colors.background,
    card: colors.card,
    primary: colors.primary,
    disabled: colors.disabled,
    outline: colors.outline,
    accent: colors.secondary,
    secondary: colors.secondary,
    tertiary: colors.tertiary,
    text: colors.text,
    placeholder: colors.disabled,
    surface: colors.card,
    error: colors.error,
    success: colors.success,
    backdrop: colors.backdrop,
  },
};

export const dark = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};
