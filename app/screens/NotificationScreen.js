import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import useData from "../hooks/useData";
import { useFocusEffect } from "@react-navigation/native";
import axios from "../api/axios";

const NotificationScreen = () => {
  const { setActiveScreen } = useData();
  const [announcementData, setAnnouncementData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      setActiveScreen("Notification");
    }, [])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios("/announcement");
        const data =
          response.data?.map((obj) => ({
            ...obj,
            open: false,
          })) || [];
        setAnnouncementData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        paddingTop: 30,
      }}
    >
      <View style={{}}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ padding: 24, gap: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Announcement About Livestock
            </Text>
            {announcementData.map((value) => (
              <View
                key={value?._id}
                style={{
                  minHeight: 250,
                  height: value?.open ? "auto" : 250,
                  // maxHeight: 250,
                  maxWidth: 350,
                  backgroundColor: "white",
                  // Shadow for iOS
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  // Shadow for Android
                  elevation: 5,
                  overflow: "hidden",
                  borderRadius: 16,
                  padding: 16,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      color: "#007bff",
                    }}
                    numberOfLines={value?.open ? null : 2}
                  >
                    {value?.title}
                  </Text>
                  <Text
                    style={{
                      color: "#888",
                      marginBottom: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Date:{" "}
                    {new Date(value?.createdAt).toLocaleDateString("en-GB")}
                  </Text>
                  <Text
                    style={{ color: "#888", fontWeight: "bold" }}
                    numberOfLines={value?.open ? null : 5}
                  >
                    {value?.message}
                  </Text>
                </View>
                <Pressable
                  style={{
                    backgroundColor: "#007bff",
                    alignSelf: "center",
                    padding: 8,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    marginTop: 16,
                  }}
                  onPress={() =>
                    setAnnouncementData((prev) => {
                      return prev.map((v) => {
                        if (v?._id == value?._id) {
                          return {
                            ...v,
                            open: !v?.open,
                          };
                        }
                        return v;
                      });
                    })
                  }
                >
                  <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                    {value?.open ? "SEE LESS" : "SEE MORE"}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default NotificationScreen;
