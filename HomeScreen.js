import React, { useEffect } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate("Dashboard"); // Redirect to Dashboard after 2000 milliseconds (2 seconds)
    }, 2000);

    return () => clearTimeout(timeout); // Clear timeout on unmounting
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/homescreenbg2.png")}
        style={styles.background}
      >
        <Image source={require("./assets/logo2.png")} style={styles.logo} />
        <Text style={styles.tagline}>
          Savor the flavors from your fridge with ease
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chatbot")}
          style={styles.loginbutton}
        >
          <Text style={styles.loginbuttonText}>ingrEATientsbot</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Dashboard")}
          style={styles.signupbutton}
        >
          <Text style={styles.signupbuttonText}>ingrEATients Dashboard</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 300,
    height: 250,
    resizeMode: "contain",
    alignSelf: "center",
  },
  tagline: {
    fontSize: 18,
    marginTop: 0,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    resizeMode: "repeat",
    justifyContent: "center",
    width: 380,
    height: 900,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Add an overlay to ensure text is readable
  },

  loginbutton: {
    backgroundColor: "#0C3E31",
    padding: 15,
    borderRadius: 40,
    marginTop: 200,
    alignSelf: "center",
    width: 300,
  },
  loginbuttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  signupbutton: {
    backgroundColor: "#0C3E31",
    padding: 15,
    borderRadius: 40,
    marginTop: 20,
    alignSelf: "center",
    width: 300,
  },
  signupbuttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default HomeScreen;
