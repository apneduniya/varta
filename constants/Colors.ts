/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
// const tintColorDark = '#fff';
const tintColorDark = '#9B8AE6';

const _colors = {
  light: {
    text: '#11181C',
    background: '#FAFAFA',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    // Custom Colors
    badgeBgColor: '#FFFFFF',
  },
  dark: {
    text: '#ECEDEE',
    // background: '#151718',
    background: "#222222",
    // background: '#080808',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabBackground: '#2a2a2a',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    // Custom Colors
    badgeBgColor: '#000000',
  },
};


export const Colors = {
  light: _colors.light,
  dark: _colors.dark,

  current: _colors.dark,
  currentReverse: _colors.light,
};

