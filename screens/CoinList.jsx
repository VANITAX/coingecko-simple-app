import { StyleSheet } from 'react-native';
import { Text, View, Pressable, Image, FlatList } from 'react-native';

const DATA = [
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    "current_price": 41732,
    "market_cap": 792031913589,
    "market_cap_rank": 1,
    "total_volume": 12022317896,
    "price_change_percentage_24h": 0.16255,
  }
];


const Item = ({ title }) => (
  <View>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function CoinList({ navigation }) {
  const renderItem = ({ item }) => <Item title={item.title} />;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Markets</Text>
      <View style={styles.filterContainer}>
        <Pressable 
          style={styles.filterButton}
          onPress={()=>navigation.navigate('NotFound')} 
        >
          <Image style={styles.filterIcon} source={require('../assets/images/options.png')} />
          <Text style={styles.filterButtonText}>By Cyrpto Rank</Text>
        </Pressable>
        <Pressable 
          style={styles.filterButton}
          onPress={()=>navigation.navigate('NotFound')} 
        >
          <Image style={styles.filterIcon} source={require('../assets/images/exchange.png')} />
          <Text style={styles.filterButtonText}>USD</Text>
        </Pressable>
      </View>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    width: '100%',
    color: '#fff', 
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 28,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#232323',
    borderRadius: 30,
    marginRight: 12
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    margin: 6,
  },
  filterIcon: {
    width: 16,
    height: 16
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
