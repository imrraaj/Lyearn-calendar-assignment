import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useCTX } from "../context/appContext";
import TitleText from "./TitleText";
import AllSessions from "./Sessions";

import constants from '../staticData/constants';

export default function Sessions() {


  const [sessionSelected, setSessionSelected] = useState(constants.ALL_SESSIONS);
  const { ctxObj } = useCTX();

  return (
    <View>
      {/* Session Section */}
      <ScrollView horizontal={true} style={styles.container}>
        <View style={styles.sessionContainer}>

          <TouchableOpacity
            onPress={() => setSessionSelected(constants.ALL_SESSIONS)}
            style={styles.session}
          >
            <TitleText
              size={16}
              style={[
                styles.session__title,
                {
                  color:
                    sessionSelected == constants.ALL_SESSIONS
                      ? ctxObj.theme.primary
                      : ctxObj.theme.placeholder,
                  lineHeight: 22,
                  borderBottomColor:
                    sessionSelected == constants.ALL_SESSIONS ? ctxObj.theme.primary : "transparent",
                }]}
            >
              All Sessions
            </TitleText>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => setSessionSelected(constants.MY_SESSIONS)}
            style={styles.session}
          >
            <TitleText
              size={16}
              style={[
                styles.session__title,
                {
                  color:
                    sessionSelected == constants.MY_SESSIONS
                      ? ctxObj.theme.primary
                      : ctxObj.theme.placeholder,
                  borderBottomColor:
                    sessionSelected == constants.MY_SESSIONS
                      ? ctxObj.theme.primary
                      : "transparent",
                }]}
            >
              My Sessions
            </TitleText>
          </TouchableOpacity>
        </View>
      </ScrollView>


      <AllSessions sessionSelected={sessionSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  sessionContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  session: {
    alignSelf: "center",
    marginRight: 32,
  },
  session__title: {
    borderBottomWidth: 2,
    paddingBottom: 18,
    lineHeight: 22,
  },
});
