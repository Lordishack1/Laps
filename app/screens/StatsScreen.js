import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import axios from "axios";
import { useUser } from "../context/userContext.js";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

const StatsScreen = () => {
  const { userEmail } = useUser();
  const [dataShow, setDataShow] = useState([]);

  useEffect(() => {
    showStats();
  }, []);

  const showStats = async () => {
    try {
      if (!userEmail) {
        alert("error in stats screen");
        return;
      }
      console.log(userEmail);
      const { data } = await axios.get(
        "http://192.168.1.14:8080/api/v1/auth/stats",
        { params: { email: userEmail } }
      );

      if (!data) {
        alert("error data is null");
        return;
      }
      setDataShow(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderItem = ({ item }) => {
    const date = new Date(item.date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;

    return (
      <View style={styles.entry}>
        <View style={styles.dateAndIcon}>
          {item.snowboarding ? (
            <View>
              <FontAwesome name="snowboarding" color="blue" size={30} />
            </View>
          ) : (
            <View>
              <FontAwesome name="skiing" color="blue" size={30} />
            </View>
          )}
          <Text style={styles.statsLettering}>{formattedDate}</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.distance}>
            <FontAwesome name="route" color="red" size={20} />
            <View>
              <Text style={styles.statsLettering2}>{item.totalDistance}</Text>
              <Text style={styles.statsLettering}>Total Distance</Text>
            </View>
          </View>
          <View style={styles.distance}>
            <FontAwesome
              style={styles.fire}
              name="fire"
              color="red"
              size={20}
            />
            <View>
              <Text style={styles.statsLettering2}>{item.topSpeed}</Text>
              <Text style={styles.statsLettering}>Top Speed</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.log}>
        <Text style={styles.heading}>Log:</Text>
        {dataShow.length === 0 ? (
          <View style={styles.entry}>
            <Text style={styles.statsLettering2}>
              You have not logged any stats yet!
            </Text>
          </View>
        ) : (
          <FlatList
            data={dataShow}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  entry: {
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "lightgrey",
    borderRadius: 15,
  },
  log: {
    display: "flex",
    flex: 1,
    padding: 20,
    overflow: "scroll",
  },
  stat1: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  stat2: {
    flex: 1,
    alignItems: "center",
    padding: 4,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  container2: {
    display: "flex",
    flexDirection: "row",
  },
  bord: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    height: 180,
    margin: 10,
    padding: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dateAndIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statsLettering: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingRight: 10,
  },
  statsLettering2: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 40,
  },
  distance: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default StatsScreen;
