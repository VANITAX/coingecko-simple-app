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
import ShareIcon from '../assets/images/share.png';
import SearchIcon from '../assets/images/search.png';

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


export default function PairsListScreen({ navigation }) {

  const renderItem = ({ item:id }) => (
    <Link key={id} to={{screen: 'PairDetail', params: { id }}} >
      <PairItem id={id}/>
    </Link>
  );

  return (
    <ScreenViewWrapper>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Markets</Text>
        <View style={styles.tools}>
          <Pressable 
            style={styles.toolButton}
            onPress={()=>navigation.navigate('Search')} 
          >
            <Image style={styles.toolIcon} source={SearchIcon} />
          </Pressable>
          <Pressable 
            style={styles.toolButton}
            onPress={()=>navigation.navigate('AboutTarget')} 
          >
          <Image style={styles.toolIcon} source={ShareIcon} />
        </Pressable>
        </View>
      </View>
      
      <View style={styles.filterContainer}>
        <Pressable 
          style={styles.filterButton}
          onPress={()=>navigation.navigate('AboutTarget')} 
        >
          <Image style={styles.filterIcon} source={OptionsIcon} />
          <Text style={styles.filterButtonText}>By Cyrpto Rank</Text>
        </Pressable>
        <Pressable 
          style={styles.filterButton}
          onPress={()=>navigation.navigate('AboutTarget')} 
        >
          <Image style={styles.filterIcon} source={ExchangeIcon} />
          <Text style={styles.filterButtonText}>USD</Text>
        </Pressable>
      </View>
      <FlatList 
        data={MockData} 
        renderItem={renderItem} 
        keyExtractor={(item, i) => (item + i)} 
        onEndReached={()=>{}}
        onEndReachedThreshold={0.5}
        ListFooterComponent={null}
      />
    </ScreenViewWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 38,
  },
  tools: {
    flexDirection: 'row',
  },
  toolIcon: {
    width: 22, 
    height: 22,
  },
  toolButton: {
    marginLeft: 16
  },
  headerTitle: {
    color: '#fff', 
    fontSize: 40,
    ...font.roboto.bold
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 32,
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
