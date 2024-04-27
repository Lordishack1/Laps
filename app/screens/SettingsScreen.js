import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Switch,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MatComIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import { useUser } from "../context/userContext.js";
import axios from "axios";

function SettingsScreen({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(false);
  const [modalVisEmail, setModalVisEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [modalVisPass, setModalVisPass] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [modalVisCon, setModalVisCon] = useState(false);
  const [newCon, setNewCon] = useState("");
  const { userEmail, setUserEmail } = useUser();

  //toggle functions
  const toggleModalEmail = () => {
    setModalVisEmail(!modalVisEmail);
  };
  const toggleModalPass = () => {
    setModalVisPass(!modalVisPass);
  };
  const toggleModalContact = () => {
    setModalVisCon(!modalVisCon);
  };
  //Submit functions
  const handleSubmitEmail = async () => {
    try {
      if (!newEmail || !userEmail) {
        Alert.alert("Please fill all fields");
        return;
      }
      const { data } = await axios.post(
        "http://172.27.2.32:8080/api/v1/auth/change-email",
        { newEmail, userEmail }
      );
      setUserEmail(newEmail);
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
    toggleModalEmail();
  };
  const handleSubmitPass = async () => {
    try {
      if (!userEmail || !newPass) {
        Alert.alert("Please fill all fields");
        return;
      }

      const { data } = await axios.post(
        "http://172.27.2.32:8080/api/v1/auth/change-password",
        { userEmail, newPass }
      );
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
    toggleModalPass();
  };
  const handleSubmitContact = () => {
    // Handle submission logic here
    console.log("Contact value:", newCon);
    toggleModalContact();
  };

  const handleSubmitDelete = () => {
    Alert.alert(
      "",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              if (!userEmail) {
                Alert.alert("Please fill all fields");
                return;
              }
              const { data } = await axios.delete(
                "http://192.168.1.14:8080/api/v1/auth/delete",
                { data: { userEmail } }
              );
              navigation.navigate("Login");
              alert(data && data.message);
            } catch (error) {
              alert(error.response.data.message);
              console.log(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const openAppSettings = async () => {
    // Open the app settings screen
    await Linking.openSettings();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.heading}>Preferances:</Text>
        <View style={styles.press}>
          <Feather
            style={styles.featherDark}
            name="moon"
            color="white"
            size={20}
          />
          <Text style={styles.format}>Dark Mode</Text>
          <Switch
            onValueChange={() => setDarkMode(!darkMode)}
            value={darkMode}
          />
        </View>
        <Pressable style={styles.press} onPress={openAppSettings}>
          <Feather
            style={styles.featherLocation}
            name="navigation"
            color="white"
            size={20}
          />
          <Text style={styles.format}>Location</Text>
          <Text>{">"}</Text>
        </Pressable>
      </View>

      <View style={styles.container}>
        <Text style={styles.heading}>Account:</Text>
        <Pressable style={styles.press} onPress={toggleModalEmail}>
          <Modal isVisible={modalVisEmail} onBackdropPress={toggleModalEmail}>
            <View style={styles.modal}>
              <Text style={styles.modalText}>Enter New Email:</Text>
              <TextInput
                style={styles.input}
                value={newEmail}
                onChangeText={setNewEmail}
                placeholder="Enter new email here..."
              />
              <Button title="Submit" onPress={handleSubmitEmail} />
            </View>
          </Modal>
          <Feather
            style={styles.featherMail}
            name="mail"
            color="white"
            size={20}
          />
          <Text style={styles.format}>Change Email</Text>
          <Text>{">"}</Text>
        </Pressable>
        <Pressable style={styles.press} onPress={toggleModalPass}>
          <Modal isVisible={modalVisPass} onBackdropPress={toggleModalPass}>
            <View style={styles.modal}>
              <Text style={styles.modalText}>Enter New Password:</Text>
              <TextInput
                style={styles.input}
                value={newPass}
                onChangeText={setNewPass}
                placeholder="Enter new pasword here..."
              />
              <Button title="Submit" onPress={handleSubmitPass} />
            </View>
          </Modal>
          <MatComIcons
            style={styles.matMail}
            name="pencil-outline"
            color="white"
            size={20}
          />
          <Text style={styles.format}>Change Password</Text>
          <Text>{">"}</Text>
        </Pressable>
      </View>

      <View style={styles.container}>
        <Text style={styles.heading}>Resources:</Text>
        <Pressable style={styles.press} onPress={toggleModalContact}>
          <Modal isVisible={modalVisCon} onBackdropPress={toggleModalContact}>
            <View style={styles.modalMulti}>
              <Text style={styles.modalText}>Contact Us:</Text>
              <TextInput
                style={styles.inputMulti}
                multiline={true}
                numberOfLines={20}
                value={newCon}
                onChangeText={setNewCon}
                placeholder="How can we help you?"
              />
              <Button title="Submit" onPress={handleSubmitContact} />
            </View>
          </Modal>
          <MatComIcons
            style={styles.matMail}
            name="phone-outline"
            color="white"
            size={20}
          />
          <Text style={styles.format}>Contact Us</Text>
          <Text>{">"}</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Button color="red" title="Delete Account" onPress={handleSubmitDelete}>
          Delete Account
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
  },
  press: {
    borderRadius: 10,
    height: 58,
    backgroundColor: "lightgrey",
    marginTop: "2%",
    marginLeft: "5%",
    marginRight: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  format: {
    flex: 1,
    paddingLeft: "4%",
    fontWeight: "bold",
  },
  heading: {
    marginLeft: "5%",
    fontSize: 20,
    fontWeight: "bold",
  },
  featherDark: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    borderColor: "#007afe",
    backgroundColor: "#007afe",
    overflow: "hidden",
  },
  featherLocation: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    borderColor: "#32c759",
    backgroundColor: "#32c759",
    overflow: "hidden",
  },
  featherMail: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    borderColor: "#007afe",
    backgroundColor: "#007afe",
    overflow: "hidden",
  },
  matMail: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    borderColor: "#007afe",
    backgroundColor: "#007afe",
    overflow: "hidden",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalMulti: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    height: 300,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 18,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputMulti: {
    width: "100%",
    height: 190,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SettingsScreen;
