import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useI18n } from "../i18n/I18nProvider";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { t, isTranslating } = useI18n();
  const navigation = useNavigation();
  const [activeService, setActiveService] = useState(0);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      try {
        const decoded = JSON.parse(atob(storedToken.split('.')[1]));
        setUserName(decoded.name);
      } catch {
        setUserName(null);
      }
    }
  };

  const services = [
    { 
      icon: "build", 
      title: t("home.services.home_repairs"), 
      desc: t("home.services.home_repairs_desc") 
    },
    { 
      icon: "electrical-services", 
      title: t("home.services.installation"), 
      desc: t("home.services.installation_desc") 
    },
    { 
      icon: "people", 
      title: t("home.services.maintenance"), 
      desc: t("home.services.maintenance_desc") 
    },
    { 
      icon: "access-time", 
      title: t("home.services.emergency"), 
      desc: t("home.services.emergency_desc") 
    }
  ];

  const features = [
    { 
      icon: "people", 
      title: t("home.features.skilled_workers"), 
      desc: t("home.features.skilled_workers_desc") 
    },
    { 
      icon: "security", 
      title: t("home.features.secure_platform"), 
      desc: t("home.features.secure_platform_desc") 
    },
    { 
      icon: "payment", 
      title: t("home.features.easy_payments"), 
      desc: t("home.features.easy_payments_desc") 
    },
    { 
      icon: "location-on", 
      title: t("home.features.location_based"), 
      desc: t("home.features.location_based_desc") 
    }
  ];

  const stats = [
    { number: "10K+", label: t("home.stats.active_workers") },
    { number: "50K+", label: t("home.stats.jobs_completed") },
    { number: "4.9", label: t("home.stats.avg_rating") },
    { number: "24/7", label: t("home.stats.support") }
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      
      {/* Loading overlay for translations */}
      {isTranslating && (
        <View className="absolute top-0 left-0 w-full h-1 bg-blue-600 z-50" />
      )}

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Navigation */}
        <View className="flex-row items-center justify-between px-6 py-4 bg-slate-900/95">
          <Text className="font-bold text-xl text-blue-400">QuickShift</Text>
          <View className="flex-row items-center space-x-3">
            <LanguageSwitcher />
            {token ? (
              <TouchableOpacity
                className="px-4 py-2 bg-blue-600 rounded-lg"
                onPress={() => navigation.navigate("Dashboard")}
              >
                <Text className="text-white text-sm font-medium">
                  {userName || t("home.nav.dashboard")}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="px-4 py-2 bg-blue-600 rounded-lg"
                onPress={() => navigation.navigate("Auth")}
              >
                <Text className="text-white text-sm font-medium">
                  {t("home.nav.login")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Hero Section */}
        <View className="relative px-6 py-12 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
          <View className="items-center">
            <View className="flex-row items-center px-3 py-2 bg-blue-500/20 rounded-full mb-6">
              <Icon name="star" size={16} color="#FCD34D" style={{ marginRight: 8 }} />
              <Text className="text-sm text-gray-100">{t("home.stats.active_workers")}</Text>
            </View>
            
            <Text className="text-3xl font-bold text-center text-white mb-4 leading-tight">
              {t("home.hero.title")}
            </Text>
            <Text className="text-lg text-center text-blue-400 mb-6 font-semibold">
              {t("home.hero.subtitle")}
            </Text>
            <Text className="text-lg text-center text-gray-300 mb-8 px-4">
              {t("home.hero.subtitle")}
            </Text>
            
            <View className="w-full space-y-4 mb-8">
              <TouchableOpacity 
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex-row items-center justify-center"
                onPress={() => navigation.navigate("Auth")}
              >
                <Text className="text-white font-semibold text-lg mr-2">
                  {t("home.cta.start_journey")}
                </Text>
                <Icon name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity className="w-full px-6 py-4 border-2 border-blue-400 rounded-full flex-row items-center justify-center">
                <Icon name="search" size={20} color="#60A5FA" style={{ marginRight: 8 }} />
                <Text className="text-blue-400 font-semibold text-lg">
                  {t("home.explore_services")}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View className="w-full">
              <View className="flex-row flex-wrap justify-between">
                {stats.map((stat, index) => (
                  <View key={index} className="w-[48%] mb-4 p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                    <Text className="text-2xl font-bold text-blue-400 text-center mb-1">
                      {stat.number}
                    </Text>
                    <Text className="text-sm text-gray-300 text-center">
                      {stat.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Services Section */}
        <View className="py-12 px-4 bg-slate-900">
          <Text className="text-4xl font-bold text-center text-white mb-4">
            {t("home.services.title")}
          </Text>
          <Text className="text-lg text-gray-400 text-center mb-8 px-4">
            {t("home.services.home_repairs_desc")}
          </Text>
          
          <View className="space-y-4">
            {services.map((service, index) => (
              <TouchableOpacity 
                key={index}
                className={`p-6 rounded-2xl ${
                  activeService === index 
                    ? 'bg-gradient-to-br from-blue-700 to-cyan-700' 
                    : 'bg-slate-800'
                }`}
                onPress={() => setActiveService(index)}
              >
                <View className="flex-row items-start">
                  <View className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Icon name={service.icon} size={24} color="#60A5FA" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-semibold text-white mb-2">
                      {service.title}
                    </Text>
                    <Text className="text-gray-400">
                      {service.desc}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Features Section */}
        <View className="py-12 px-4 bg-slate-950">
          <Text className="text-4xl font-bold text-center text-white mb-4">
            {t("home.features.title")}
          </Text>
          <Text className="text-lg text-gray-400 text-center mb-8 px-4">
            {t("home.hero.subtitle")}
          </Text>
          
          <View className="space-y-6">
            {features.map((feature, index) => (
              <View key={index} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 mb-4 flex-row items-start">
                <View className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
                  <Icon name={feature.icon} size={32} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-2xl font-semibold text-white mb-2">
                    {feature.title}
                  </Text>
                  <Text className="text-gray-400">{feature.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View className="py-12 px-4 bg-gradient-to-r from-slate-900 to-slate-800">
          <Text className="text-3xl font-bold text-center text-white mb-4">
            {t("home.cta.title")}
          </Text>
          <Text className="text-lg text-gray-300 text-center mb-8 px-4">
            {t("home.cta.subtitle")}
          </Text>
          <View className="flex-row justify-center space-x-4">
            <TouchableOpacity
              className="px-8 py-4 bg-blue-600 rounded-full"
              onPress={() => navigation.navigate("Auth")}
            >
              <Text className="text-white font-bold text-lg">
                {t("home.cta.start_journey")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-8 py-4 border-2 border-gray-300 rounded-full">
              <Text className="text-gray-300 font-bold text-lg">
                {t("home.cta.learn_more")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="py-8 px-4 bg-slate-950 border-t border-slate-800">
          <Text className="text-center text-gray-400 mb-2">
            {t("home.footer.privacy")} | {t("home.footer.terms")} | {t("home.footer.support")}
          </Text>
          <Text className="text-center text-gray-500">
            {t("home.footer.copyright")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}