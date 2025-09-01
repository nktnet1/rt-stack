import { SupportedLanguages } from '@repo/i18n';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@repo/ui/components/select';
import { i18n } from '@/clients/i18nClient';

export default function LanguageSelector() {
  return (
    <Select
      value={i18n.language}
      onValueChange={(newLanguage) => i18n.changeLanguage(newLanguage)}
    >
      <SelectTrigger className="bg-accent">
        <SelectValue placeholder="??" />
      </SelectTrigger>
      <SelectContent>
        {SupportedLanguages.map((language) => (
          <SelectItem key={language} value={language}>
            {language}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
