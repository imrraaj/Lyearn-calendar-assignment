import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { useFonts } from "expo-font";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Sessions from "./components/SessionHeader";



//APP

export default function App() {

  // Font loading
  const [loaded] = useFonts({
    Inter: require("./assets/fonts/Inter-Regular.ttf"),
    InterBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }



  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
        <View style={styles.container}>
          <Banner />
          <Sessions />
          <StatusBar translucent backgroundColor="white" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
