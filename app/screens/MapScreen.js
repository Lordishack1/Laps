import React, { useState, useEffect } from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geojson from "react-native-geojson";
//import skiAreas from "../assets/ski_areas.geojson";

const MapScreen = () => {
  /*const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const info = async () => {
      try {
        const response = await fetch("../assets/ski_areas.geojson");
        if (!response.ok) {
          throw new Error("Failed to fetch GeoJSON");
        }
        const data = await response.json();
        setJsonData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    info();
  });*/

  /*<Geojson
            data={require("../assets/ski_areas.geojson")}
            strokeColor="#000000"
            strokeWidth={2}
            fillColor="#000000"
          />
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
          >
            <View style={styles.marker} />
          </Marker>*/
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexy}>
        <MapView style={styles.map}></MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  flexy: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
