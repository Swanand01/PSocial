import { useRef, useCallback, useMemo, useState } from "react";
import { Text, StyleSheet, Animated, useWindowDimensions, Easing } from "react-native";

function useToast() {
    const { width } = useWindowDimensions()
    const yPos = useRef(new Animated.Value(50)).current
    const fade = useRef(new Animated.Value(0)).current
    const toastWidth = width - 100
    const [toastText, setToastText] = useState("")

    const show = useCallback((text, duration, onComplete) => {
        setToastText(text)
        Animated.sequence([
            Animated.parallel([
                Animated.timing(
                    yPos,
                    {
                        toValue: -50,
                        duration: 1000,
                        useNativeDriver: true,
                        easing: Easing.bounce
                    },
                ),
                Animated.timing(
                    fade,
                    {
                        toValue: 1,
                        duration: 1200,
                        useNativeDriver: true,
                        easing: Easing.ease
                    },
                )
            ]),
            Animated.delay(duration),
            Animated.parallel([
                Animated.timing(
                    yPos,
                    {
                        toValue: 50,
                        duration: 2000,
                        useNativeDriver: true,
                        easing: Easing.bounce
                    },
                ),
                Animated.timing(
                    fade,
                    {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                        easing: Easing.ease
                    },
                )
            ])
        ]).start(onComplete)

    }, [])

    const Toast = useMemo(() => {
        return ({ containerStyle, textStyle }) => {
            return <Animated.View
                style={[
                    style.toastContainer,
                    {
                        width: toastWidth,
                        transform: [
                            { translateX: -toastWidth / 2 },
                            { translateY: yPos }
                        ],
                        position: 'relative',
                        left: '50%',
                        opacity: fade,
                    },
                    containerStyle
                ]}
            >
                <Text style={[style.text, textStyle]}>{toastText}</Text>
            </Animated.View>
        }
    }, [toastText])

    return [Toast, show]
}

const style = StyleSheet.create({
    toastContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
    },
    text: {
        fontFamily: 'Metropolis',
        fontSize: 20,
        textAlign: 'center'
    }
})

export default useToast;