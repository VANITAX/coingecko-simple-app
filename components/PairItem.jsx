import { Dimensions, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import useCurrencySymbol from '../hooks/useCurrencySymbol';
import font from '../constants/styleFonts';

import FormatNumberText from './FormatNumberText';

const windowWidth = Dimensions.get('window').width;
const TOTAL_PADDING_HORIZONTAL = 40;
const itemWidth = (windowWidth - TOTAL_PADDING_HORIZONTAL);
export default function PairItem({ 
    id,
    dataKey,
    symbol, name, image, 
    current_price, 
    market_cap, 
    market_cap_rank, 
    vs_currency,
    price_change_percentage_24h,
    fetchCoinFinance, isFetched
  }) {
  if(!id) return null;
  
  const uppercasedSymbol = symbol?.toUpperCase();
  const hasFinanceData = !!current_price;
  const currencySymbol = useCurrencySymbol(vs_currency);

  useEffect(() => {
    if(!hasFinanceData) {
      fetchCoinFinance({ coin_id: id, vs_currency })
    }
  }, [])

  if(isFetched && !hasFinanceData) return null;
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Image style={styles.icon} source={{ uri: image }}/>
        <View>
          <Text style={styles.primary}>{uppercasedSymbol}</Text>
          <Text style={styles.secondary}>{name}</Text>
        </View>
      </View>
      
      { hasFinanceData ?
        <View style={styles.group}>
          <View style={styles.marketInfo}>
            <View style={styles.priceAction}>
              <FormatNumberText 
                style={styles.primary} 
                prefix={currencySymbol} 
                fixed={5}
                format="commas" 
                value={current_price}
              />
              <FormatNumberText 
                useColor
                usePnMarker
                style={styles.changePercentage}
                fixed={2}
                value={price_change_percentage_24h}
                suffix="%"
              />
            </View>
            <FormatNumberText 
              style={styles.secondary} 
              prefix={currencySymbol} 
              format="commas" 
              value={market_cap}
            />
          </View>
        </View>
      : null }
    </View>
  )
}

PairItem.propTypes = {
  dataKey: PropTypes.string.isRequired,
  id: PropTypes.string,
  symbol: PropTypes.string,
  name: PropTypes.string, 
  image: PropTypes.string, 
  current_price: PropTypes.number, 
  market_cap: PropTypes.number,
  price_change_percentage_24h: PropTypes.number,
};

PairItem.defaultProps = {
  symbol: '',
  name: '', 
  image: '', 
  current_price: 0, 
  market_cap: 0,
  price_change_percentage_24h: 0,
};

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 26, 
    height: 26,
    marginVertical: 20, 
    marginRight: 18,
  },
  primary: {
    fontSize: 18, 
    color: '#fff', 
    ...font.roboto.bold
  },
  secondary: {
    fontSize: 14, 
    color: '#B1B1B1', 
    marginTop: 4,
    ...font.roboto.regular
  },
  priceAction: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    ...font.roboto.regular
  },
  marketInfo: {
    alignItems: 'flex-end'
  },
  changePercentage: {
    marginLeft: 6,
    fontSize: 12, 
  },
});