import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useI18n } from "../i18n/I18nProvider";
import { LANGUAGES } from "./List";

export default function LanguageSwitcher() {
  const { lang, setLang, isTranslating } = useI18n();

  const currentLanguage = LANGUAGES.find(l => l.code === lang);

  return (
    <View className="flex-row items-center space-x-2 px-3 py-2 bg-slate-900 rounded-lg border border-blue-400">
      {isTranslating ? (
        <ActivityIndicator size="small" color="#60A5FA" />
      ) : (
        <Icon name="language" size={20} color="#60A5FA" />
      )}
      
      <Picker
        selectedValue={lang}
        onValueChange={(itemValue) => setLang(itemValue)}
        enabled={!isTranslating}
        style={{ 
          color: '#F3F4F6', 
          width: 150,
          backgroundColor: 'transparent'
        }}
        dropdownIconColor="#60A5FA"
      >
        {LANGUAGES.map(language => (
          <Picker.Item 
            key={language.code} 
            label={`${language.flag} ${language.label}`} 
            value={language.code}
            color="#F3F4F6"
          />
        ))}
      </Picker>
      
      {isTranslating && (
        <Text className="text-xs text-blue-400 animate-pulse">
          Translating...
        </Text>
      )}
    </View>
  );
}