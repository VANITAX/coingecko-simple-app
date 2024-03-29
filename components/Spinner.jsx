import { Animated, Easing } from 'react-native';

import LoadingImage from '../assets/images/loader.png';

export default function Spinner () {
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(
      spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear, 
        useNativeDriver: true
      }
    )
  ).start()

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.Image
      style={{transform: [{rotate: spin}] }}
      source={LoadingImage} />
  );
}