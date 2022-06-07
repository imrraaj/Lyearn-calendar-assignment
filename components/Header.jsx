import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import SearchIcon from "../assets/images/Search.svg";
import MenuIcon from "../assets/images/Menu.svg";


export default function Header() {
    return (
        <View style={styles.header}>

            <TouchableOpacity>
                <MenuIcon />
            </TouchableOpacity>

            <View style={styles.right}>

                <TouchableOpacity>
                    <SearchIcon />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={require("../assets/images/Header.png")} style={styles.rightchild} />
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 18,
        marginTop: 60,
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
    },
    right: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    rightchild: {
        paddingRight: 20,
        marginLeft:27,
    }

})