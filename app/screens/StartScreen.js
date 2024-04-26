import React, { useState, useEffect } from "react";
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
  KeyboardAvoidingView,
  Image,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useUser } from "../context/userContext.js";

const StartScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isKeyVisible, setKeyVisible] = useState(false);
  const { userEmail, setUserEmail } = useUser();

  useEffect(() => {
    console.log("User email changed:", userEmail);
  }, [userEmail]);

  const handleFocus = () => {
    setKeyVisible(true);
  };

  const handleBlur = () => {
    setKeyVisible(false);
  };

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Please fill all fields");
        return;
      }
      const { data } = await axios.post(
        "http://192.168.1.14:8080/api/v1/auth/login",
        { email, password }
      );
      setUserEmail(email);
      alert(data && data.message);
      navigation.navigate("Tabs");
      console.log("Login Data => ", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };
  /*<KeyboardAwareScrollView
        contentContainerStyle={
          isKeyVisible ? styles.loginContainerUp : styles.loginContainer
        }
      ></KeyboardAwareScrollView>
        <SafeAreaView style={styles.loginContainer}>
        
        
        <Text style={styles.title}>Welcome to Laps!</Text>*/
  return (
    <KeyboardAvoidingView>
      <View>
        <ImageBackground
          style={styles.background}
          resizeMode="cover"
          source={require("../assets/ima.jpeg")}
        />

        <SafeAreaView style={styles.titlesAlign}>
          <Image
            style={styles.logo}
            source={require("../assets/LapsLogo.webp")}
          ></Image>
          <Text style={styles.slogan}>
            Where all your stats are in one place
          </Text>
        </SafeAreaView>

        <SafeAreaView style={styles.loginContainer}>
          <Text style={styles.login}>Login:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(e) => setEmail(e)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Button
            title="Login"
            onPress={() => {
              handleSubmit();
            }}
            color={"black"}
          />
          <Button
            title="Create Account"
            onPress={() => {
              navigation.navigate("Create");
            }}
            color={"black"}
          />
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};
//calculating font size for the subtitle
const windowWidth = Dimensions.get("screen").width;
const fontSizePercentage = 5;
const fontSize = (windowWidth * fontSizePercentage) / 100;

//calculating font size for the Login
const fontSizePercentageLogin = 8;
const fontSizLogin = (windowWidth * fontSizePercentageLogin) / 100;

const styles = StyleSheet.create({
  background: {
    //backgroundColor: "black",
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  titlesAlign: {
    alignItems: "center",
    height: "15%",
    marginBottom: "10%",
  },
  title: {
    fontSize: fontSize,
    paddingBottom: 5,
  },
  loginContainer: {
    alignItems: "center",
    marginTop: "70%",
  },
  loginContainerUp: {
    alignItems: "center",
  },
  loginContainerUpUp: {
    alignItems: "center",
    marginTop: "10%",
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
  keyView: {
    height: "100%",
  },
  logo: {
    marginTop: "10%",
    width: Dimensions.get("screen").width / 2,
    height: Dimensions.get("screen").width / 2,
    borderWidth: "1px solid",
    borderRadius: "100",
  },
  slogan: {
    marginTop: "10%",
    fontSize: fontSize,
  },
});

export default StartScreen;
