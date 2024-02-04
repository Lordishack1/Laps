import React from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";

const CreateUserScreen = ({ navigation }) => {
  const navi = () => {
    navigation.navigate("Tabs");
  };
  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.createTitle}>Create User</Text>
      <TextInput style={styles.buttonSpace} placeholder="Username" />
      <TextInput style={styles.buttonSpace} placeholder="Password" />
      <Button title="Create" onPress={navi} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  createTitle: {
    fontSize: "40%",
    paddingBottom: "10%",
  },
  buttonSpace: {
    borderColor: "black",
    borderWidth: 1,
    width: Dimensions.get("screen").width / 1.5,
    height: Dimensions.get("screen").height / 15,
    backgroundColor: "gray",
    color: "black",
    textAlign: "center",
    marginBottom: "8%",
  },
});

export default CreateUserScreen;
