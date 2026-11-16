import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  ICON_APPEARANCE,
  ICON_LIGHT_MODE,
  ICON_DARK_MODE,
  ICON_SYSTEM_MODE,
} from 'dashboard/helper/commandbar/icons';
import { LocalStorage } from 'shared/helpers/localStorage';
import { LOCAL_STORAGE_KEYS } from 'dashboard/constants/localStorage';
import { setColorTheme } from 'dashboard/helper/themeHelper.js';

const getThemeOptions = t => [
  {
    key: 'light',
    label: t('COMMAND_BAR.COMMANDS.LIGHT_MODE'),
    icon: ICON_LIGHT_MODE,
  },
  {
    key: 'dark',
    label: t('COMMAND_BAR.COMMANDS.DARK_MODE'),
    icon: ICON_DARK_MODE,
  },
  {
    key: 'auto',
    label: t('COMMAND_BAR.COMMANDS.SYSTEM_MODE'),
    icon: ICON_SYSTEM_MODE,
  },
];

const getPaletteOptions = t => [
  {
    key: 'valle',
    label: t('COMMAND_BAR.COMMANDS.THEME_VALLE'),
    icon: ICON_APPEARANCE,
  },
  {
    key: 'ocean',
    label: t('COMMAND_BAR.COMMANDS.THEME_OCEAN'),
    icon: ICON_APPEARANCE,
  },
  {
    key: 'forest',
    label: t('COMMAND_BAR.COMMANDS.THEME_FOREST'),
    icon: ICON_APPEARANCE,
  },
  {
    key: 'rose',
    label: t('COMMAND_BAR.COMMANDS.THEME_ROSE'),
    icon: ICON_APPEARANCE,
  },
];

const setAppearance = theme => {
  LocalStorage.set(LOCAL_STORAGE_KEYS.COLOR_SCHEME, theme);
  const isOSOnDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  setColorTheme(isOSOnDarkMode);
};

export function useAppearanceHotKeys() {
  const { t } = useI18n();

  const themeOptions = computed(() => getThemeOptions(t));
  const paletteOptions = computed(() => getPaletteOptions(t));

  const goToAppearanceHotKeys = computed(() => {
    const options = themeOptions.value.map(theme => ({
      id: theme.key,
      title: theme.label,
      parent: 'appearance_settings',
      section: t('COMMAND_BAR.SECTIONS.APPEARANCE'),
      icon: theme.icon,
      handler: () => {
        setAppearance(theme.key);
      },
    }));
    const palettes = paletteOptions.value.map(palette => ({
      id: palette.key,
      title: palette.label,
      parent: 'color_theme_settings',
      section: t('COMMAND_BAR.SECTIONS.APPEARANCE'),
      icon: palette.icon,
      handler: () => {
        LocalStorage.set(LOCAL_STORAGE_KEYS.COLOR_THEME, palette.key);
        setColorTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
      },
    }));
    return [
      {
        id: 'appearance_settings',
        title: t('COMMAND_BAR.COMMANDS.CHANGE_APPEARANCE'),
        section: t('COMMAND_BAR.SECTIONS.APPEARANCE'),
        icon: ICON_APPEARANCE,
        children: options.map(option => option.id),
      },
      ...options,
      {
        id: 'color_theme_settings',
        title: t('COMMAND_BAR.COMMANDS.CHANGE_COLOR_THEME'),
        section: t('COMMAND_BAR.SECTIONS.APPEARANCE'),
        icon: ICON_APPEARANCE,
        children: palettes.map(option => option.id),
      },
      ...palettes,
    ];
  });

  return {
    goToAppearanceHotKeys,
  };
}
