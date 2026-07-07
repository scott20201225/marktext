import { type MenuItemConstructorOptions } from 'electron'
import { APP_LANGUAGE_OPTIONS } from 'common/i18n'
import * as actions from '../actions/language'
import { t } from '../../i18n'
import type Preference from '../../preferences'

export default function(preferences: Preference): MenuItemConstructorOptions {
  const currentLanguage = preferences.getItem<string>('language')

  return {
    label: t('preferences.general.misc.language.title'),
    id: 'languageMenu',
    submenu: APP_LANGUAGE_OPTIONS.map((option) => ({
      label: option.label,
      type: 'radio',
      checked: currentLanguage === option.value,
      click() {
        actions.selectLanguage(option.value)
      }
    }))
  }
}
