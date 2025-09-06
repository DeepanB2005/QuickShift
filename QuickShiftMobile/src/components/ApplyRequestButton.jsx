import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import { useI18n } from "../i18n/I18nProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = "https://quickshift-11fb.onrender.com"; // Replace with your API URL

export default function ApplyRequestButton({ jobId }) {
  const { t } = useI18n();
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    setLoading(true);
    setMsg("");
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(`${API}/api/join-requests`, { jobId, message }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg(t("joinRequests.applied") || "Request sent!");
      setOpen(false);
      Alert.alert("Success", t("joinRequests.applied") || "Request sent!");
    } catch (err) {
      const errorMsg = err?.response?.data?.message || t("common.error");
      setMsg(errorMsg);
      Alert.alert("Error", errorMsg);
    }
    setLoading(false);
  };

  return (
    <View className="mt-2">
      <TouchableOpacity
        className={`px-3 py-2 rounded-lg ${loading ? 'bg-green-400' : 'bg-green-600'}`}
        onPress={() => setOpen(true)}
        disabled={loading}
      >
        <Text className="text-white text-center font-medium">
          {t("joinRequests.apply") || "Apply"}
        </Text>
      </TouchableOpacity>

      {open && (
        <View className="mt-3 p-4 bg-gray-100 rounded-lg">
          <TextInput
            className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-800"
            placeholder={t("joinRequests.message") || "Message (optional)"}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
          
          <View className="flex-row gap-2 mt-3">
            <TouchableOpacity
              className={`flex-1 px-4 py-2 rounded-lg ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
              onPress={handleApply}
              disabled={loading}
            >
              <View className="flex-row items-center justify-center">
                {loading && <ActivityIndicator size="small" color="white" style={{ marginRight: 8 }} />}
                <Text className="text-white text-center font-medium">
                  {loading ? t("common.loading") : t("joinRequests.send") || "Send"}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-1 px-4 py-2 bg-gray-300 rounded-lg"
              onPress={() => setOpen(false)}
              disabled={loading}
            >
              <Text className="text-gray-700 text-center font-medium">
                {t("joinRequests.cancel") || "Cancel"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {msg && (
        <Text className="text-green-600 mt-2 text-center">
          {msg}
        </Text>
      )}
    </View>
  );
}