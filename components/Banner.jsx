import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useCTX } from '../context/appContext';
import TitleText from './TitleText';
import ParagraphText from './ParagraphText';

export default function Banner() {

  const { ctxObj } = useCTX();

  return (

    <View style={styles.container}>

      <TitleText size={26} style={styles.title}>
        Sessions
        </TitleText>

      <ParagraphText
        size={16}
        color={ctxObj.theme.paragraph}
        style={styles.ptext}
      >

        Discover on-demand learning, discussions and interactive sessions in
        your community
        
        </ParagraphText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  title: {
    lineHeight:36,
    marginTop: 40,
    marginBottom: 16,
  },
  ptext: {
    lineHeight: 26,
    marginBottom: 36,
  },
})