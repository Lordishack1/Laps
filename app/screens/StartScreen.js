import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const StartScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Please fill all fields");
        return;
      }
      const { data } = await axios.post(
        "http://172.27.2.32:8080/api/v1/auth/login",
        { email, password }
      );
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("Tabs");
      console.log("Login Data => ", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };
  //temp function to check local storage data
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("Local Storage ==> ", data);
  };
  getLocalStorageData();
  return (
    <View>
      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={require("../assets/snowboarderTrick.jpeg")}
      />

      <SafeAreaView style={styles.titlesAlign}>
        <Text style={styles.title}>Welcome to Laps!</Text>
        <Text>Where all your stats are in one place</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.loginContainer}>
        <Text style={styles.login}>Login:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(e) => setPassword(e)}
        />
        <Button
          title="Login"
          onPress={() => {
            handleSubmit();
          }}
        />
        <Button
          title="Create Account"
          onPress={() => {
            navigation.navigate("Create");
          }}
        />
      </SafeAreaView>
    </View>
  );
};
//calculating font size for the title
const windowWidth = Dimensions.get("screen").width;
const fontSizePercentage = 10;
const fontSize = (windowWidth * fontSizePercentage) / 100;

//calculating font size for the subtitle
const fontSizePercentageSub = 3;
const fontSizSub = (windowWidth * fontSizePercentageSub) / 100;

//calculating font size for the Login
const fontSizePercentageLogin = 8;
const fontSizLogin = (windowWidth * fontSizePercentageLogin) / 100;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  titlesAlign: {
    alignItems: "center",
    height: "50%",
    marginBottom: "10%",
  },
  title: {
    fontSize: fontSize,
    paddingBottom: 5,
  },
  subTitle: {
    fontSize: fontSizSub,
  },
  loginContainer: {
    alignItems: "center",
  },
  login: {
    fontSize: fontSizLogin,
    paddingBottom: "5%",
  },
  textInput: {
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

export default StartScreen;
