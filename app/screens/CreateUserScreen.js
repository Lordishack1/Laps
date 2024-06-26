import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import axios from "axios";

const CreateUserScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (!name || !email || !password) {
        Alert.alert("Please fill all fields");
        return;
      }
      const { data } = await axios.post(
        "http://192.168.1.14:8080/api/v1/auth/register",
        { name, email, password }
      );
      alert(data && data.message);
      navigation.navigate("Login");
      console.log("Register Data => ", { name, email, password });
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.createTitle}>Create User</Text>
      <TextInput
        style={styles.buttonSpace}
        placeholder="Name"
        placeholderTextColor="black"
        onChangeText={(e) => setName(e)}
        value={name}
      />
      <TextInput
        style={styles.buttonSpace}
        placeholder="Email"
        placeholderTextColor="black"
        onChangeText={(e) => setEmail(e)}
        value={email}
      />
      <TextInput
        style={styles.buttonSpace}
        placeholder="Password"
        placeholderTextColor="black"
        secureTextEntry={true}
        onChangeText={(e) => setPassword(e)}
        value={password}
      />
      <Button
        title="Create"
        onPress={() => {
          handleSubmit();
        }}
      />
      <Button
        title="Already have an account"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  createTitle: {
    fontSize: 40,
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
