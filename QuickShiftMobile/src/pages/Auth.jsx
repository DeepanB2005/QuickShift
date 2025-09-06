import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useI18n } from "../i18n/I18nProvider";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Icon from 'react-native-vector-icons/MaterialIcons';

const API = "https://quickshift-11fb.onrender.com"; // Replace with your API URL
const SKILL_OPTIONS = [
  "Cleaning", "Painting", "Plumbing", "Electrician", "Gardening", "Carpentry", "Cooking", "Other"
];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AuthScreen() {
  const { t } = useI18n();
  const navigation = useNavigation();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "",
    location: "", role: "user", phone: "",
    age: "", skills: [], customSkill: "", experience: "", wageMin: "", wageMax: "",
    availability: [], description: ""
  });

  const onChange = (field, value) => setForm({ ...form, [field]: value });

  const handleRole = (role) => setForm(f => ({ ...f, role }));

  const submit = async () => {
    setLoading(true);
    try {
      if (mode === "register") {
        if (form.password !== form.confirm) {
          Alert.alert("Error", t("register.errors.passwords_dont_match"));
          return;
        }

        let skills = form.skills;
        if (skills.includes("Other") && form.customSkill) {
          skills = skills.filter(s => s !== "Other").concat(form.customSkill);
        }

        const payload = {
          name: form.name, email: form.email, password: form.password,
          location: form.location, role: form.role, phone: form.phone,
          age: form.age,
          skills: form.role === "worker" ? skills : [],
          experience: form.role === "worker" ? form.experience : undefined,
          wageMin: form.role === "worker" ? form.wageMin : undefined,
          wageMax: form.role === "worker" ? form.wageMax : undefined,
          availability: form.role === "worker" ? form.availability : [],
          description: form.role === "worker" ? form.description : ""
        };
        const { data } = await axios.post(`${API}/api/auth/register`, payload);
        await AsyncStorage.setItem("token", data.token);
      } else {
        const { data } = await axios.post(`${API}/api/auth/login`, {
          email: form.email, password: form.password
        });
        await AsyncStorage.setItem("token", data.token);
      }
      navigation.replace("Dashboard");
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || t("login.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-900">
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white/20">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="font-bold text-2xl text-white">QuickShift</Text>
        <LanguageSwitcher />
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="pt-8 pb-4">
          <View className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6">
            <Text className="text-2xl font-bold text-center text-indigo-600">
              {mode === "login" ? t("login.title") : t("register.title")}
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              {mode === "login" ? t("login.subtitle") : t("register.subtitle")}
            </Text>

            {/* Form Fields */}
            {mode === "register" && (
              <>
                <View className="flex-row gap-2 mb-4">
                  <View className="flex-1">
                    <TextInput
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 bg-white"
                      placeholder="Full Name"
                      value={form.name}
                      onChangeText={(value) => onChange("name", value)}
                    />
                  </View>
                  <View className="flex-1">
                    <TextInput
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 bg-white"
                      placeholder="Age"
                      value={form.age}
                      onChangeText={(value) => onChange("age", value)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                {/* Role Selection */}
                <View className="flex-row gap-3 mb-4">
                  <TouchableOpacity
                    className={`flex-1 px-4 py-3 rounded-lg border ${
                      form.role === "user" ? "bg-indigo-600" : "bg-gray-100"
                    }`}
                    onPress={() => handleRole("user")}
                  >
                    <Text className={`text-center font-medium ${
                      form.role === "user" ? "text-white" : "text-gray-700"
                    }`}>
                      Customer
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 px-4 py-3 rounded-lg border ${
                      form.role === "worker" ? "bg-indigo-600" : "bg-gray-100"
                    }`}
                    onPress={() => handleRole("worker")}
                  >
                    <Text className={`text-center font-medium ${
                      form.role === "worker" ? "text-white" : "text-gray-700"
                    }`}>
                      Worker
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row gap-2 mb-4">
                  <TextInput
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-3 bg-white"
                    placeholder="City / Location"
                    value={form.location}
                    onChangeText={(value) => onChange("location", value)}
                  />
                  <TextInput
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-3 bg-white"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChangeText={(value) => onChange("phone", value)}
                    keyboardType="phone-pad"
                  />
                </View>

                {/* Worker-specific fields would go here */}
                {form.role === "worker" && (
                  <View className="bg-gray-50 p-4 rounded-lg border mb-4">
                    <Text className="font-medium mb-2">Worker Details</Text>
                    <TextInput
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 bg-white mb-2"
                      placeholder="Experience (years)"
                      value={form.experience}
                      onChangeText={(value) => onChange("experience", value)}
                      keyboardType="numeric"
                    />
                    <View className="flex-row gap-2 mb-2">
                      <TextInput
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-3 bg-white"
                        placeholder="Wage From"
                        value={form.wageMin}
                        onChangeText={(value) => onChange("wageMin", value)}
                        keyboardType="numeric"
                      />
                      <TextInput
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-3 bg-white"
                        placeholder="To"
                        value={form.wageMax}
                        onChangeText={(value) => onChange("wageMax", value)}
                        keyboardType="numeric"
                      />
                    </View>
                    <TextInput
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 bg-white"
                      placeholder="Describe your work experience..."
                      value={form.description}
                      onChangeText={(value) => onChange("description", value)}
                      multiline
                      numberOfLines={3}
                      textAlignVertical="top"
                    />
                  </View>
                )}
              </>
            )}

            {/* Email & Password */}
            <TextInput
              className="w-full border border-gray-300 rounded-lg px-3 py-3 bg-white mb-4"
              placeholder="Email"
              value={form.email}
              onChangeText={(value) => onChange("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              className="w-full border border-gray-300 rounded-lg px-3 py-3 bg-white mb-4"
              placeholder="Password"
              value={form.password}
              onChangeText={(value) => onChange("password", value)}
              secureTextEntry
            />
            {mode === "register" && (
              <TextInput
                className="w-full border border-gray-300 rounded-lg px-3 py-3 bg-white mb-6"
                placeholder="Confirm Password"
                value={form.confirm}
                onChangeText={(value) => onChange("confirm", value)}
                secureTextEntry
              />
            )}

            {/* Submit Button */}
            <TouchableOpacity
              className="w-full bg-indigo-600 rounded-lg py-3 mb-4"
              onPress={submit}
              disabled={loading}
            >
              <View className="flex-row items-center justify-center">
                {loading && <ActivityIndicator size="small" color="white" style={{ marginRight: 8 }} />}
                <Text className="text-white text-center font-semibold">
                  {loading ? "Loading..." : (mode === "login" ? t("login.sign_in_button") : t("register.create_account_button"))}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Switch mode */}
            <TouchableOpacity
              className="items-center"
              onPress={() => setMode(mode === "login" ? "register" : "login")}
            >
              <Text className="text-indigo-700 font-medium">
                {mode === "login" ? 
                  (t("auth.switchToRegister") || "Don't have an account? Register") : 
                  (t("auth.switchToLogin") || "Already have an account? Login")
                }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}