import { 
  StyleSheet, 
  Text, 
  ScrollView,
  View, 
  Pressable, 
  Image, 
  Linking,
  FlatList } from 'react-native';

import ScreenViewWrapper from '../components/ScreenViewWrapper';
import FormatNumberText from '../components/FormatNumberText';
import TrendLineChart from '../components/TrendLineChart';

import RightArrowIcon from '../assets/images/right-arrow.png';
import ShareIcon from '../assets/images/share.png';

import font from '../constants/styleFonts';

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

const statsInfoItem = ({label, value}) => {
  return (
    <View style={styles.statsInfoItem}>
      <Text style={styles.statsInfoLabel}>{label}</Text>
      <Text style={styles.statsInfoValue}>{value}</Text>
    </View>
  )
}

export default function PairDetailScreen({ 
  navigation, route: {params} 
}) {
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
                useColor
                usePnMarker
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
          <View style={styles.statsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Statistics</Text>
              <Pressable 
                style={styles.seeMoreBtn}
                onPress={()=>Linking.openURL(`https://www.coingecko.com/en/coins/${params.id}`)} 
              >
                <Text style={styles.seeMoreBtnText}>See More</Text>
                <Image style={styles.leftArrow} source={RightArrowIcon} />
              </Pressable>
            </View>
            <View style={styles.statsDetailContent}>
              <View style={styles.statsDetailcolumn}>
                {statsInfoItem({label: 'Market Cap', value: 'US$786.64 Bn'})}
                {statsInfoItem({label: 'Volume 24h', value: 'US$786.64 Bn'})}
                {statsInfoItem({label: 'Max Supply', value: '21 M BTC'})}
                {statsInfoItem({label: 'All Time High', value: 'US$68,788.63'})}
                {statsInfoItem({label: 'All Time Low', value: 'US$65.53'})}
              </View>
              <View style={styles.verticalDivider} />
              <View style={styles.statsDetailcolumn}>
                {statsInfoItem({label: 'Fully Diluted Market Cap', value: 'US$871.264 Bn'})}
                {statsInfoItem({label: 'Circulating Supply', value: '18.95 M BTC'})}
                {statsInfoItem({label: 'Total Supply', value: '18.95 M BTC'})}
                {statsInfoItem({label: 'Rank', value: '#1'})}
                {statsInfoItem({label: 'Market Dominance', value: '41.62%'})}
              </View>
            </View>
          </View>
          <View style={styles.aboutInfoContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>About {symbol.toUpperCase()}</Text>
              <Pressable 
                style={styles.seeMoreBtn}
                onPress={()=>navigation.navigate('AboutTarget')} 
              >
                <Text style={styles.seeMoreBtnText}>See All</Text>
                <Image style={styles.leftArrow} source={RightArrowIcon} />
              </Pressable>
            </View>
            <View style={styles.aboutInfoWrapper}>
              <Text 
                style={styles.aboutInfoFragmentText} 
                numberOfLines={3} 
                ellipsizeMode='tail'
              >
                Bitcoin (BTC) is a cryptocurrency . Users are able to generate BTC through the process of mining. Bitcoin has a current supply of 18,903,512. The last known price of Bitcoin is 47,090.57041302 USD and is down -1.95 over the last 24 hours. It is currently trading on 8198 active market(s) with $31,437,091,906.25 traded over the last 24 hours.
              </Text>
            </View>
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
    fontSize: 22,
    marginBottom: 4,
    ...font.roboto.bold

  },
  subtitle: {
    fontSize: 14,
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
    fontSize: 16,
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
    fontSize: 30,
    letterSpacing: 1.1,
    color: '#fff',
    marginRight: 8,
    ...font.roboto.bold
  },

  changePercentage: {
    fontSize: 18,
    lineHeight: 24,
    ...font.roboto.regular
  },

  graphContainer: {
    marginBottom: 32,  
  },

  statsContainer: {
    marginBottom: 32,  
  },

  sectionHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderStyle: 'solid', 
    paddingBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    ...font.roboto.bold
  },

  statsDetailContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  statsDetailcolumn: {
    flex: 1/2,
  },

  statsInfoItem: {
    width: '100%',
    marginBottom: 12,
  },

  statsInfoLabel: {
    fontSize: 12,
    color: '#B1B1B1',
    marginBottom: 6,
    ...font.roboto.regular
  },

  statsInfoValue: {
    fontSize: 16,
    color: '#fff',
    ...font.roboto.bold
  },

  verticalDivider: {
    width: 1,
    height: '100%',
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-end',
  },

  seeMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  seeMoreBtnText: {
    fontSize: 14,
    color: '#B1B1B1',
    ...font.roboto.regular
  },

  leftArrow: {
    width: 12, 
    height: 12,
    marginLeft: 4,
    transform: ([{ "rotate": '180deg'}]),
  },

  aboutInfoContainer: {},

  aboutInfoWrapper: {
    paddingVertical: 12, 
  },

  aboutInfoFragmentText: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.5,
    color: '#B1B1B1',
    ...font.roboto.regular
  }
});
