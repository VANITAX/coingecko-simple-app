import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import PropTypes from 'prop-types';

import font from '../constants/styleFonts';

import FormatNumberText from './FormatNumberText';

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
    "price_change_percentage_24h": 15.68086,
  },
  "ethereum": {
    "id": "ethereum",
    "symbol": "eth",
    "name": "Ethereum",
    "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    "current_price": 3183.02,
    "market_cap": 379737669172,
    "market_cap_rank": 2,
    "price_change_24h": 176.18,
    "price_change_percentage_24h": 5.85932,
  },
}

export default function PairItem({ navigation, id }) {
  const {
    symbol, name, image, 
    current_price, 
    market_cap, 
    market_cap_rank, 
    price_change_percentage_24h: change_percentage
  } = mockData[id];

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Image 
          style={styles.icon} 
          source={{
            url:image
          }}
        />
        <View>
          <Text style={styles.primary}>{symbol?.toUpperCase()}</Text>
          <Text style={styles.secondary}>{name}</Text>
        </View>
      </View>
      <View style={styles.group}>
        <View style={styles.marketInfo}>
          <View style={styles.priceAction}>
            <FormatNumberText 
              style={styles.primary} 
              prefix="$" 
              format="commas" 
              value={current_price}
            />
            <FormatNumberText 
              style={styles.changePercentage}
              useColor={true}
              usePnMarker={true}
              fixed={2}
              value={change_percentage}
              suffix="%"
            />
          </View>
          <FormatNumberText 
            style={styles.secondary} 
            prefix="$" 
            format="commas" 
            value={market_cap}
          />
        </View>
      </View>
    </View>
  )
}

PairItem.propTypes = {
  id: PropTypes.string.isRequired,
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
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

const priceActionColor = Percentage => {
  if(Percentage > 0) {
    return '#76DE93';
  }
  if (Percentage < 0) {
    return '#DE7676';
  }
  return '#FFFFFF';
}