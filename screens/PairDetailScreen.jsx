import { Dimensions,
  StatusBar,
  StyleSheet, 
  Text, 
  ScrollView,
  View, 
  Pressable, 
  Image, 
  FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import ScreenViewWrapper from '../components/ScreenViewWrapper';
import FormatNumberText from '../components/FormatNumberText';
import TrendLineChart from '../components/TrendLineChart';

import RightArrowIcon from '../assets/images/right-arrow.png';
import ShareIcon from '../assets/images/share.png';

import font from '../constants/styleFonts';

import MockMarketData from '../mock_market_chart.json';

const mockData = {
  "bitcoin": {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    "current_price": 42452,
    "market_cap": 805206641889,
    "market_cap_rank": 1,
    "price_change_24h": 701.75,
    "price_change_percentage_24h": 1.68086,
  },
}

const {
  symbol, name, image, 
  current_price, 
  market_cap, 
  market_cap_rank, 
  price_change_percentage_24h
} = mockData["bitcoin"];

export default function PairDetailScreen({ navigation }) {
  return (
    <ScreenViewWrapper>
      <View style={styles.header}>
        <Pressable onPress={()=>navigation.goBack()}>
          <Image style={styles.headerIcon} source={RightArrowIcon} />
        </Pressable>
        <Text style={styles.headerTitle}>{symbol.toUpperCase()}</Text>
        <Pressable>
          <Image style={styles.headerIcon} source={ShareIcon} />
        </Pressable>
      </View>
      <View style={styles.titleContainer}>
        <Image style={styles.logo} source={{url: image}} />
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{symbol.toUpperCase()}/USD</Text>
        </View>
      </View>
      <View style={styles.scrollView} >
        <ScrollView >
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <View style={styles.priceRow}>
              <FormatNumberText
                style={styles.currentPrice}
                prefix="$" 
                format="commas" 
                value={current_price}
              />
              <FormatNumberText 
                style={styles.changePercentage}
                useColor={true}
                usePnMarker={true}
                fixed={2}
                value={price_change_percentage_24h}
                suffix="%"
              />
            </View>
          </View>
          <View style={styles.graphContainer}>
           <TrendLineChart style={styles.graphContainer} data={[
            41673.8395543094, 
            41493.690050910525,
            42475.543220951215,
            43910.929986443094,
            44184.447511676175, 
            44383.88805541707,
            43628.13953235228, 
            43174.37014223908,
          ]}/>
          </View>
          <View style={styles.statContainer}>
          </View>
          <View style={styles.aboutContainer}>
          </View>
        </ScrollView>
      </View>
    </ScreenViewWrapper>
  )
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
    ...font.roboto.bold
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  logo: {
    width: 44,
    height: 44,
    marginRight: 12,
  },
  title: {
    color: '#fff',
    letterSpacing: 1.1,
    fontSize: 26,
    marginBottom: 4,
    ...font.roboto.bold

  },
  subtitle: {
    fontSize: 18,
    color: '#B1B1B1',
    ...font.roboto.regular
  },

  scrollView: {
    flex: 1,
  },

  priceContainer: {
    marginBottom: 28,
  },
  priceLabel: {
    fontSize: 14,
    letterSpacing: 1.1,
    color: '#B1B1B1',
    marginBottom: 4,
    ...font.roboto.regular
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  currentPrice: {
    fontSize: 28,
    letterSpacing: 1.1,
    color: '#fff',
    marginRight: 8,
    ...font.roboto.bold
  },

  changePercentage: {
    fontSize: 16,
    lineHeight: 24,
    ...font.roboto.regular
  },

  graphContainer: {
    marginBottom: 32,  
  },

  statContainer: {
    height: 182,
    marginBottom: 32,  
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',  
  },

  aboutContainer: {
    height: 182,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',  
  }

});
