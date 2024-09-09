import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from "react-native";

const App = () => {
  const [isPortrait, setIsPortrait] = useState(true);
  const [inputText, setInputText] = useState("");

  // Get screen dimensions
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  // Handle screen orientation changes
  useEffect(() => {
    const handleChange = ({ window }) => {
      setIsPortrait(window.height > window.width);
    };

    const subscription = Dimensions.addEventListener("change", handleChange);
    return () => subscription?.remove();
  }, []);

  // Determine StatusBar style
  const statusBarStyle = isPortrait ? "dark-content" : "light-content";
  const statusBarBackgroundColor = isPortrait ? "#FFFFFF" : "#000000";

  // Calculate dynamic image size
  const imageWidth = isPortrait ? screenWidth * 0.7 : screenWidth * 0.5;
  const imageHeight = imageWidth * (9 / 16); // Maintain aspect ratio 16:9

  // Function to handle button press
  const handleButtonPress = (message) => {
    Alert.alert(message);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Customize StatusBar */}
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={
          Platform.OS === "android" ? statusBarBackgroundColor : undefined
        }
        translucent={Platform.OS === "android"}
      />

      <View
        style={[
          styles.innerContainer,
          {
            flexDirection: isPortrait ? "column" : "column",
            width: screenWidth,
            height: screenHeight,
            justifyContent: isPortrait ? "center" : "flex-start",
          },
        ]}
      >
        {/* Buttons Section */}
        <View
          style={[
            styles.buttonContainer,
            {
              flexDirection: isPortrait ? "column" : "row",
              width: isPortrait ? "80%" : "100%",
              justifyContent: "space-around",
              marginBottom: 10,
              marginTop: isPortrait ? 10 : 30,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.buttonWrapper,
              {
                width: isPortrait ? "100%" : "40%",
                height: isPortrait ? 50 : 40,
                borderRadius: 25,
                backgroundColor: "#007BFF",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            onPress={() => handleButtonPress("Gọi xe cứu thương: 115")}
          >
            <Text style={styles.buttonText}>Bấm phím 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buttonWrapper,
              {
                width: isPortrait ? "100%" : "40%",
                height: isPortrait ? 50 : 40,
                borderRadius: 25,
                backgroundColor: "#007BFF",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            onPress={() => handleButtonPress("Gọi tổng đài: 1900 15xx")}
          >
            <Text style={styles.buttonText}>Bấm phím 2</Text>
          </TouchableOpacity>
        </View>

        {/* Image Section */}
        <Image
          source={require("./assets/b.png")}
          style={[
            styles.image,
            {
              width: imageWidth,
              height: imageHeight,
              marginVertical: isPortrait ? 20 : 10,
            },
          ]}
        />

        {/* Text Input Section */}
        <TextInput
          style={[
            styles.input,
            {
              width: isPortrait ? "80%" : "70%",
              marginTop: isPortrait ? 20 : 10,
              marginBottom: isPortrait ? 20 : 30,
            },
          ]}
          placeholder="Mời bạn nhập vào đây..."
          value={inputText}
          onChangeText={setInputText}
          onEndEditing={() => Alert.alert(`Minh đã nhập: ${inputText}`)} // Show alert when done typing
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Platform.select({ ios: 20, android: 10 }),
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonWrapper: {
    margin: 1,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  image: {
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});

export default App;
