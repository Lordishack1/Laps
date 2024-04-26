import React, { useState, useEffect } from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

const MapScreen = () => {
  const [dataShow, setDataShow] = useState([]);

  useEffect(() => {
    showMarkers();
  }, []);

  const showMarkers = async () => {
    try {
      const { data } = await axios.get(
        "http://192.168.1.14:8080/api/v1/auth/map"
      );

      if (!data || !data.geoJson) {
        alert("Error: Data is null or does not contain geoJson");
        return;
      }

      setDataShow(data.geoJson);
    } catch (error) {
      console.log(error.message);
    }
  };

  const extractCoordinates = (coords) => {
    if (Array.isArray(coords[0])) {
      return extractCoordinates(coords[0]);
    } else {
      return {
        latitude: coords[1],
        longitude: coords[0],
      };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexy}>
        <MapView style={styles.map}>
          {dataShow?.map((feature, index) => {
            const coordinates = extractCoordinates(
              feature.geometry.coordinates
            );
            return (
              <Marker
                key={index}
                coordinate={coordinates}
                title={feature.properties?.name}
              />
            );
          })}
        </MapView>
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
