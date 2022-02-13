import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

export default function ScreenViewWrapper({ children, isModalScreen, ...props }) {
  const { height } = useWindowDimensions();
  const childrenNodes = React.Children.map(children, children=>children);
  const insert = useSafeAreaInsets();
  const paddingTop = (!isModalScreen ? 20 : 0);
  const modalHeaderHeight = 80;
  const screenViewHeight = height - insert.top - paddingTop - (isModalScreen && modalHeaderHeight);
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
  children: PropTypes.node.isRequired,
  isModalScreen: PropTypes.bool,
};

ScreenViewWrapper.defaultProps = {
  isModalScreen: false,
};