import { 
  StyleSheet, 
  Text, 
  ScrollView,
  View, 
  Pressable, 
  Image, 
  Linking,
  RefreshControl,
  FlatList } from 'react-native';
import { useEffect, useMemo } from 'react';

import useCurrencySymbol from '../hooks/useCurrencySymbol';

import ScreenViewWrapper from '../components/ScreenViewWrapper';
import FormatNumberText from '../components/FormatNumberText';
import TrendLineChart from '../components/TrendLineChart';
import ShareToTwitterButton from '../components/ShareToTwitterButton';
import RightArrowIcon from '../assets/images/right-arrow.png';
import ShareIcon from '../assets/images/share.png';

import font from '../constants/styleFonts';

const statsInfoItem = ({label, value}) => {
  return (
    <View style={styles.statsInfoItem}>
      <Text style={styles.statsInfoLabel}>{label}</Text>
      <Text style={styles.statsInfoValue}>{value}</Text>
    </View>
  )
}

const chartDataWithoutTimestamp = data => data?.map(([timestamp, value]) => value) || [];

export default function PairDetailScreen({ 
  navigation, dataKey, id,
  symbol, name, image, current_price,
  market_cap, market_cap_rank,
  price_change_percentage_24h,
  fully_diluted_valuation, chartData,
  high_24h, low_24h, all_time_high, all_time_low,
  total_volume, max_supply, total_supply, circulating_supply,
  last_updated, vs_currency, description, 
  fetchCoinDetail, fetchCoinFinance, fetchCoinFinanceGraph,
  isDetailsFetching, isFinanceFetching, isFinanceGraphFetching
}) {
  useEffect(()=> {
    fetchCoinDetail({ coin_id: id });
    fetchCoinFinanceGraph({coin_id: id , vs_currency})
  },[id]);

  const onRefresh = () => {
    fetchCoinDetail({ coin_id: id });
    fetchCoinFinance({coin_id: id , vs_currency});
    fetchCoinFinanceGraph({coin_id: id , vs_currency});
  }

  const pricePointData = useMemo(()=>
    chartDataWithoutTimestamp(chartData), 
    [chartData]);

  const currencySymbol = useCurrencySymbol(vs_currency);

  const pairName = `${symbol}/${vs_currency}`?.toUpperCase();
  const uppercaseSymbol = symbol.toUpperCase();
  const lastUpdated = last_updated.split('T')[0];
  const isAllDataFetching = isFinanceFetching && isDetailsFetching && isFinanceGraphFetching;
  return (
    <ScreenViewWrapper>
      <View style={styles.header}>
        <Pressable onPress={()=>navigation.goBack()}>
          <Image style={styles.headerIcon} source={RightArrowIcon} />
        </Pressable>
        <Text style={styles.headerTitle}>{uppercaseSymbol}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Image style={styles.logo} source={{url: image}} />
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{pairName}</Text>
        </View>
      </View>
      <View style={styles.scrollView} >
        <ScrollView 
          refreshControl={
            <RefreshControl
              tintColor="#fff"
              refreshing={isAllDataFetching}
              onRefresh={onRefresh}
            />
          }>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <View style={styles.priceRow}>
              <FormatNumberText
                style={styles.currentPrice}
                prefix={currencySymbol} 
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
          <TrendLineChart 
            style={styles.graphContainer}
            currency={vs_currency}
            isFetching={isFinanceGraphFetching} 
            data={pricePointData}/>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Statistics</Text>
              <Pressable 
                style={styles.seeMoreBtn}
                onPress={()=>Linking.openURL(`https://www.coingecko.com/en/coins/${id}`)} 
              >
                <Text style={styles.seeMoreBtnText}>See More</Text>
                <Image style={styles.leftArrow} source={RightArrowIcon} />
              </Pressable>
            </View>
            <View style={styles.statsDetailContent}>
              <View style={styles.statsDetailcolumn}>
                {statsInfoItem({
                  label: 'Market Cap', 
                  value: (<FormatNumberText prefix={currencySymbol} format="metric" fixed={2} value={market_cap}/>)
                })}
                {statsInfoItem({
                  label: 'Total Volume', 
                  value: (<FormatNumberText prefix={currencySymbol} format="metric" fixed={2} value={total_volume}/>)
                })}
                {statsInfoItem({
                  label: 'Max Supply', 
                  value: (<FormatNumberText format="metric" fixed={2} value={max_supply}/>)
                })}
                 {statsInfoItem({
                  label: '24h High', 
                  value: (<FormatNumberText prefix={currencySymbol} format="commas" value={high_24h}/>)
                })}
                {statsInfoItem({
                  label: 'All Time High', 
                  value: (<FormatNumberText prefix={currencySymbol} format="commas" value={all_time_high}/>)
                })}
                {statsInfoItem({label: 'Rank', value: `#${market_cap_rank}`})}
              </View>
              <View style={styles.verticalDivider} />
              <View style={styles.statsDetailcolumn}>
                {statsInfoItem({
                  label: 'Fully Diluted Valuation', 
                  value: (<FormatNumberText prefix={currencySymbol} format="metric" fixed={2} value={fully_diluted_valuation}/>)
                })}
                {statsInfoItem({
                  label: 'Circulating Supply', 
                  value: (<FormatNumberText prefix={currencySymbol} format="metric" fixed={2} value={circulating_supply}/>)
                })}
                {statsInfoItem({
                  label: 'Total Supply', 
                  value: (<FormatNumberText prefix={currencySymbol} format="metric" fixed={2} value={total_supply}/>)
                })}
                {statsInfoItem({
                  label: '24h Low', 
                  value: (<FormatNumberText prefix={currencySymbol} format="commas" value={low_24h}/>)
                })}
                {statsInfoItem({
                  label: 'All Time Low', 
                  value: (<FormatNumberText prefix={currencySymbol} format="commas" value={all_time_low}/>)
                })}
                {statsInfoItem({label: 'Last Updated', value: lastUpdated})}
              </View>
            </View>
          </View>
          <View style={styles.aboutInfoContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>About {uppercaseSymbol}</Text>
              <Pressable 
                style={styles.seeMoreBtn}
                onPress={()=>navigation.navigate('AboutTarget',{dataKey})} 
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
              >{description}
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
