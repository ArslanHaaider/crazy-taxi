import {useLocale, useTranslations} from 'next-intl';
import LocaleSwitcherSelect from './LocalSwitcherSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: "English",
        },
        {
          value: 'de',
          label:"German",
        }
      ]}
      label={t('label')}
    />
  );
}