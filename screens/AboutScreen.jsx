import { 
  useWindowDimensions, 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  Image, 
  ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';
import PropTypes from 'prop-types';
import ScreenViewWrapper from '../components/ScreenViewWrapper';
import CloseIcon from '../assets/images/close.png';
import font from '../constants/styleFonts';

export default function AboutScreen({ navigation, symbol, description }) {
  const html = `<body style="color: #fff; font-size: 14px; line-height: 22px;">${description}</body>`
  const { width } = useWindowDimensions();
  const uppercaseSymbol = symbol.toUpperCase();
  return (
    <ScreenViewWrapper isModalScreen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>About {'BTC'}</Text>
        <Pressable onPress={()=>navigation.goBack()}>
          <Image style={styles.headerIcon} source={CloseIcon} />
        </Pressable>
      </View>
      <ScrollView>
        <RenderHtml 
          style={styles.content}
          contentWidth={width}
          source={{html}}
        />
      </ScrollView>
    </ScreenViewWrapper>
  );
}

AboutScreen.propTypes = {
  symbol: PropTypes.string,
  description: PropTypes.string,
}

AboutScreen.defaultProps = {
  symbol: '',
  description: ''
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIcon: {
    width: 22,
    height: 22,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    paddingLeft: 22,
    ...font.roboto.bold
  },
  content: {
    color: '#fff'
  }
});
