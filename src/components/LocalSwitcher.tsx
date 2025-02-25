import {useLocale, useTranslations} from 'next-intl';
import LocaleSwitcherSelect from './LocalSwitcherSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
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