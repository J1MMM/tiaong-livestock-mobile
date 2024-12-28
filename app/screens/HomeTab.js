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
  const [livestockPiechartData, setLivestockPiechartData] = useState(null);
  const [livestockBarchart, setLivestockBarchart] = useState(null);
  const [yearlyLivestock, setYearlyLivestock] = useState(null);
  const [yearlyMortality, setYearlyMortality] = useState(null);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      setActiveScreen("Home");

      const fetchPie = async () => {
        try {
          const response = await axios.post(
            "/analytics/total-livestock-mortality",
            { id: auth?.id }
          );

          setLivestockPiechartData(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchYM = async () => {
        try {
          const response = await axios.post(
            "/analytics/farmer-yearly-mortality",
            { id: auth?.id }
          );

          setYearlyMortality(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchYL = async () => {
        try {
          const response = await axios.post(
            "/analytics/farmer-yearly-livestock",
            { id: auth?.id }
          );

          setYearlyLivestock(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchBarchart = async () => {
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

      fetchBarchart();
      fetchPie();
      fetchYL();
      fetchYM();
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
            {/* <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Total Livestock and Mortality
            </Text> */}

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
            {/* <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              Livestock Stocks(Bar Chart)
            </Text> */}

            <BarChart
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
                    data: livestockBarchart,
                  },
                ],
              }}
              width={ScreenWidth - 32}
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

        {typeChart == "Yearly Livestock's" &&
          yearlyLivestock !== null &&
          yearlyLivestock?.length >= 0 && (
            <>
              {/* <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Yearly Livestocks(Line Chart)
              </Text> */}

              <LineChart
                data={{
                  labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                  datasets: [
                    {
                      data: yearlyLivestock,
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 32}
                height={220}
                chartConfig={{
                  backgroundColor: "#FFF",
                  backgroundGradientFrom: "#FFF",
                  backgroundGradientTo: "#FFF",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 123, 225, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#007bff",
                  },
                }}
                style={{
                  marginTop: 16,
                }}
                formatYLabel={(value) => parseInt(value, 10)?.toString()}
              />
            </>
          )}

        {typeChart == "Yearly Mortality" &&
          yearlyMortality !== null &&
          yearlyLivestock?.length >= 0 && (
            <>
              {/* <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Yearly Mortality(Line Chart)
              </Text> */}

              <LineChart
                data={{
                  labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                  datasets: [
                    {
                      data: yearlyMortality,
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 32}
                height={220}
                chartConfig={{
                  backgroundColor: "#FFF",
                  backgroundGradientFrom: "#FFF",
                  backgroundGradientTo: "#FFF",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#DC143C",
                  },
                }}
                style={{
                  marginTop: 16,
                }}
                formatYLabel={(value) => parseInt(value, 10)?.toString()}
              />
            </>
          )}
      </View>
    </View>
  );
};

export default HomeTab;
