import React from "react";
import { View } from "react-native";
import ParagraphText from "./ParagraphText";
import { useCTX } from "../context/appContext";

export default function Chip({ chipText, chipBg, color, isSelected, isBold }) {

    const { ctxObj } = useCTX();
    return (
        <View style={{
            backgroundColor: chipBg ? chipBg : ctxObj.theme.tertiary,
            borderWidth: 1,
            borderColor: isSelected ? ctxObj.theme.primary : "transparent",
            paddingHorizontal: 16,
            paddingVertical: 6,
            borderRadius: 24,
            marginRight: 8,
            alignSelf: "flex-start",
        }}>

            <ParagraphText
                style={{
                    fontFamily: isBold ? ctxObj.font.bold : ctxObj.font.normal,
                    fontSize: isBold ? 12 : 16,
                }}
                color={color}>
                {chipText}
            </ParagraphText>
        </View>
    )
}