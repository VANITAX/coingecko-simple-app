import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  Image, 
  FlatList } from 'react-native';
import { Link } from '@react-navigation/native';
import ScreenViewWrapper from '../components/ScreenViewWrapper';
import PairItem from '../components/PairItem';
import font from '../constants/styleFonts';

import OptionsIcon from '../assets/images/options.png';
import ExchangeIcon from '../assets/images/exchange.png';
const MockData = [
  "bitcoin",
  "ethereum",
  "ethereum",
  "ethereum",
  "ethereum",
  "ethereum",
  "ethereum",
  "ethereum",
  "ethereum",
  "ethereum",
  "ethereum",
  "ethereum",
  "ethereum",
  "ethereum",
];

const renderItem = ({ item:id }) => (
  <Link key={id} to={{screen: 'PairDetail', params: { id }}} ><PairItem id={id}/></Link>
);

export default function PairsListScreen({ navigation }) {
  return (
    <ScreenViewWrapper>
      <Text style={styles.header}>Markets</Text>
      <View style={styles.filterContainer}>
        <Pressable 
          style={styles.filterButton}
          onPress={()=>navigation.navigate('Modal')} 
        >
          <Image style={styles.filterIcon} source={OptionsIcon} />
          <Text style={styles.filterButtonText}>By Cyrpto Rank</Text>
        </Pressable>
        <Pressable 
          style={styles.filterButton}
          onPress={()=>navigation.navigate('Modal')} 
        >
          <Image style={styles.filterIcon} source={ExchangeIcon} />
          <Text style={styles.filterButtonText}>USD</Text>
        </Pressable>
      </View>
      <FlatList data={MockData} renderItem={renderItem} keyExtractor={item => item.id} />
    </ScreenViewWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
  header: {
    width: '100%',
    color: '#fff', 
    fontSize: 40,
    marginBottom: 28,
    ...font.roboto.bold
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
    marginRight: 12,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    ...font.roboto.regular
  },
  filterIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  }
});
