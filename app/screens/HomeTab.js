import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import useData from "../hooks/useData";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Dropdown from "../components/Dropdown";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
const ScreenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const data = {
  labels: ["Cow", "Goat", "Chicken", "Duck", "Carabao", "Pig", "Horse"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 100],
    },
  ],
};

const HomeTab = () => {
  const { setActiveScreen } = useData();
  const [typeChart, setTypeChart] = useState("Total Livestock");
  const [livestockPiechartData, setLivestockPiechartData] = useState([]);
  const [livestockBarchart, setLivestockBarchart] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/analytics/total-livestock-mortality",
          { id: auth?.id }
        );
        const data =
          response.data?.map((obj) => ({
            ...obj,
            open: false,
          })) || [];

        setLivestockPiechartData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/analytics/total-livestock-barchart",
          { id: auth?.id }
        );

        setLivestockBarchart(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  useFocusEffect(
    useCallback(() => {
      setActiveScreen("Home");
    }, [])
  );
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", letterSpacing: 1 }}>
        Dashboard
      </Text>
      <Text style={{ fontSize: 16, color: "#888" }}>
        Here you can view your stats and updates.
      </Text>

      <View style={{ maxWidth: 350, marginTop: 16 }}>
        <Dropdown
          label="Select Chart Type"
          options={[
            "Total Livestock",
            "Livestock Stocks",
            "Yearly Livestock's",
            "Yearly Mortality",
          ]}
          placeholder="Select Chart Type:"
          value={typeChart}
          setValue={(value) => setTypeChart(value)}
        />
      </View>

      <View
        style={{
          marginTop: 24,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          elevation: 5,
          overflow: "hidden",
          borderRadius: 16,
          width: "100%",
          minHeight: 200,
          padding: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {typeChart == "Total Livestock" && livestockPiechartData && (
          <>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Total Livestock and Mortality
            </Text>

            <PieChart
              data={livestockPiechartData}
              width={ScreenWidth - 32} // Adjust width with padding
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#1E2923",
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#08130D",
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                strokeWidth: 2,
                barPercentage: 0.5,
                useShadowColorFromDataset: false,
              }}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"16"}
              center={[10, 0]}
              absolute
            />
          </>
        )}

        {typeChart == "Livestock Stocks" && livestockBarchart && (
          <>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              Livestock Stocks(Bar Chart)
            </Text>

            <BarChart
              data={livestockBarchart}
              width={ScreenWidth - 16}
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#ffffff", // Background gradient starting color
                backgroundGradientFromOpacity: 0, // Opacity of the starting color
                backgroundGradientTo: "#ffffff", // Background gradient ending color
                backgroundGradientToOpacity: 0.5, // Opacity of the ending color
                color: (opacity = 1) => `#007bff`, // Bar and text color
                barPercentage: 0.7, // Adjusts the width of the bars (0.0 to 1.0)
                useShadowColorFromDataset: false, // Shadow color is taken from dataset if true
                decimalPlaces: 0, // Number of decimal places for labels
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // X and Y axis labels' color
                propsForBackgroundLines: {
                  strokeDasharray: "", // Dotted background lines (e.g., "5,5" for dashed)
                  strokeWidth: 1,
                  stroke: "#e3e3e3",
                },
              }}
              fromZero
              style={{
                marginLeft: -24,
              }}
            />
          </>
        )}

        {typeChart == "Yearly Livestock's" && livestockPiechartData && (
          <>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              Livestock Stocks(Bar Chart)
            </Text>

            <LineChart
              data={{
                labels: [
                  "Cow",
                  "Goat",
                  "Chicken",
                  "Duck",
                  "Carabao",
                  "Pig",
                  "Horse",
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width - 32}
              height={220}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default HomeTab;
