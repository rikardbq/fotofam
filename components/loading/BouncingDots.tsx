import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const BouncingDots = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createAnimation = (animatedValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 9,
            duration: 150,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const anim1 = createAnimation(dot1, 0);
    const anim2 = createAnimation(dot2, 0);
    const anim3 = createAnimation(dot3, 0);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.container}>
      {[dot1, dot2, dot3].map((animValue, index) => {
        
        
        return (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            { transform: [{ translateX: animValue }] },
          ]}
        />
      )})}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
});

export default BouncingDots;