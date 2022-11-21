import { Text, StyleSheet } from "react-native";

export function Heading1({ text }) {
    return <Text style={style.heading1}>{text}</Text>
}

const style = StyleSheet.create({
    heading1: {
        color: "white",
        fontFamily: "Metropolis-Bold",
        fontSize: 30
    }
})