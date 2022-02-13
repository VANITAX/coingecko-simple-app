import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import PropTypes from 'prop-types';

import font from '../constants/styleFonts';

import FormatNumberText from './FormatNumberText';

export default function PairItem({ 
  id,
  dataKey,
  symbol, name, image, 
  current_price, 
  market_cap, 
  market_cap_rank, 
  price_change_percentage_24h: change_percentage
}) {
  if(!id) return null;

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
              fixed={5}
              format="commas" 
              value={current_price}
            />
            <FormatNumberText 
              useColor
              usePnMarker
              style={styles.changePercentage}
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