import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions, StyleSheet, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const isOnIos = Platform.OS === 'ios';
export default function ScreenViewWrapper({ children, isModalScreen, ...props }) {
  const { height } = useWindowDimensions();
  const childrenNodes = React.Children.map(children, children=>children);
  const insert = useSafeAreaInsets();
  const paddingTop = isModalScreen && isOnIos ? 0 : 20;
  const iOSModalHeaderHeight = isModalScreen && isOnIos ? 80 : 0;
  const iOSAdditionalHeight = paddingTop + iOSModalHeaderHeight;
  const screenViewHeight = height - insert.top - iOSAdditionalHeight;
    return (
      <SafeAreaView {...props}>
        <View style={
          styles.container({ screenViewHeight, paddingTop })
        }>{childrenNodes}</View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   container: ({ screenViewHeight, paddingTop }) => ({
    height: screenViewHeight, 
    paddingTop,
    paddingHorizontal: 20,
  }),
});

ScreenViewWrapper.propTypes = {
  children: PropTypes.node,
  isModalScreen: PropTypes.bool,
};

ScreenViewWrapper.defaultProps = {
  children: null,
  isModalScreen: false,
};