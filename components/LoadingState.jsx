import React from "react";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from "react-native";


function EventLoader({ visible }) {
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            borderBottomWidth: 1,
            borderColor: "#EAEAEA",
            paddingVertical: 24,
            paddingLeft: 16,
        }}>
            {/* Image */}
            <ShimmerPlaceHolder
                style={{
                    height: 80,
                    width: 80,
                    borderRadius: 8,
                    marginRight: 16,
                }}
                visible={visible}
                LinearGradient={LinearGradient}>
            </ShimmerPlaceHolder>

            <View>
                {/* Title */}
                <ShimmerPlaceHolder
                    style={{
                        marginBottom: 6,
                        width: 170,
                        borderRadius: 4,
                    }}
                    visible={visible}
                    LinearGradient={LinearGradient}
                >
                </ShimmerPlaceHolder>



                {/* description */}
                <View style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: 278
                }}>
                    <ShimmerPlaceHolder style={{
                        marginBottom: !visible ? 6 : 0,
                        width: 100,
                        height: 16,
                        marginRight: 6,
                        borderRadius: 4,
                    }} visible={visible} LinearGradient={LinearGradient}>
                    </ShimmerPlaceHolder>

                    <ShimmerPlaceHolder style={{
                        marginBottom: !visible ? 6 : 0,
                        width: 100,
                        height: 16,
                        borderRadius: 4,

                    }} visible={visible} LinearGradient={LinearGradient}>
                    </ShimmerPlaceHolder>
                </View>


                <ShimmerPlaceHolder style={{
                    height: 26,
                    borderRadius: 13,
                    width: 120,
                    marginTop: 12,
                }} visible={visible} LinearGradient={LinearGradient}>
                </ShimmerPlaceHolder>
            </View>
        </View>
    )
}


function ChipLoader({ visible }) {
    return (
        <>
            <ShimmerPlaceHolder style={{
                borderRadius: 24,
                marginRight: 8,
                height: 35,
                width: 85,
            }}
                visible={visible}
                LinearGradient={LinearGradient}></ShimmerPlaceHolder>
        </>
    );
}
export default function LoadingState({ visible }) {
    return (
        <>

            {/* Filter chips */}
            <View style={{
                flexDirection: "row",
                paddingHorizontal: 24,
                marginTop: 32,
            }}>
                <ChipLoader visible={visible} />
                <ChipLoader visible={visible} />
                <ChipLoader visible={visible} />
            </View>
            <View>

                {/* Date */}
                <ShimmerPlaceHolder style={{
                    marginHorizontal: 24,
                    marginVertical: 40,
                    width: 160,
                    height: 18,
                    borderRadius: 4,
                }}
                    visible={visible} LinearGradient={LinearGradient} />
            </View>
            {/* Event cards */}
            <EventLoader visible={visible} />
            <EventLoader visible={visible} />
            <EventLoader visible={visible} />
            <EventLoader visible={visible} />
        </>
    )

}