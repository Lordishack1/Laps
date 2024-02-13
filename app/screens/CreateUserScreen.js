import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import axios from "axios";

const CreateUserScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (username === "" || email === "" || password === "") {
      alert("All fields required!");
      return;
    }
    axios
      .post("http://localhost:3001/userData", {
        username,
        email,
        password,
      })
      .then(() => navigation.navigate("Tabs"))
      .catch((err) => console.log(err));
    return false;
  };

  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.createTitle}>Create User</Text>
      <TextInput
        style={styles.buttonSpace}
        placeholder="Email"
        onChangeText={(e) => setEmail(e)}
        value={email}
      />
      <TextInput
        style={styles.buttonSpace}
        placeholder="Username"
        onChangeText={(e) => setUsername(e)}
        value={username}
      />
      <TextInput
        style={styles.buttonSpace}
        placeholder="Password"
        onChangeText={(e) => setPassword(e)}
        value={password}
      />
      <Button
        title="Create"
        onPress={() => {
          handleSubmit();
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
