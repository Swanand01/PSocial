import { Text, StyleSheet } from "react-native";

export function Heading1({ text, styles }) {
    return <Text style={[style.heading1, styles]}>{text}</Text>
}

export function Heading2({ text, styles }) {
    return <Text style={[style.heading2, styles]}>{text}</Text>
}

export function Heading3({ text, styles }) {
    return <Text style={[style.heading3, styles]}>{text}</Text>
}

const style = StyleSheet.create({
    heading1: {
        color: "white",
        fontFamily: "Metropolis-Bold",
        fontSize: 30
    },
    heading2: {
        color: "white",
        fontFamily: "Metropolis-Bold",
        fontSize: 24
    },
    heading3: {
        color: "white",
        fontFamily: "Metropolis-Bold",
        fontSize: 20
    }
})