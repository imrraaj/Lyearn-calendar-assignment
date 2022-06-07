import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCTX } from '../context/appContext'

export default function ParagraphText({ children, size, color, style }) {
    const { ctxObj } = useCTX();
    return (
        <Text style={[{
            fontFamily: ctxObj.font.normal,
            fontSize: size ? size : 16,
            color: color ? color : ctxObj.theme.primary,
        }, style]}>{children}</Text>
    )
}

const styles = StyleSheet.create({})