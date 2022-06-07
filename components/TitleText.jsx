import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCTX } from '../context/appContext'

export default function TitleText({ children, size, style }) {
    const { ctxObj } = useCTX();
    return (
        <Text style={[style, { fontFamily: ctxObj.font.bold, fontSize: size }]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({})