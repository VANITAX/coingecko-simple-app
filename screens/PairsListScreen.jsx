import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  Image, 
  Linking,
  FlatList } from 'react-native';
import { Link } from '@react-navigation/native';
import { useEffect } from 'react';

import FiltersColumn from '../containers/FiltersColumn';
import ScreenViewWrapper from '../components/ScreenViewWrapper';
import PairItem from '../containers/PairItem';

import font from '../constants/styleFonts';

import ShareIcon from '../assets/images/share.png';
import SearchIcon from '../assets/images/search.png';

const renderItem = ({ item: dataKey }) => (
  <Link key={dataKey} to={{screen: 'PairDetail', params: { dataKey: dataKey }}} >
    <PairItem dataKey={dataKey}/>
  </Link>
);

export default function PairsListScreen({ 
  navigation, 
  pairItemIds,
  nextPage,
  lastPage,
  isFetching,
  fetchMarketFinance,
  currency,
  sorting
}) {

  useEffect(()=> {
    fetchMarketFinance({
      currency,
      order: currency,
      page: 1,
    });
  },[]);

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
            onPress={()=>{
              Linking.openURL('https://twitter.com/intent/tweet?text=123456789012345678901234567890%0A123456789012345678901234567890%0A123456789012345678901234567890')
            }} 
          >
          <Image style={styles.toolIcon} source={ShareIcon} />
        </Pressable>
        </View>
      </View>
      <FiltersColumn 
        screen="list" 
        useSortSelector 
        useCurrencySelector
      />
      { !!pairItemIds.length
        ? <FlatList
            style={styles.list}
            data={pairItemIds} 
            renderItem={renderItem} 
            keyExtractor={item => item} 
            refreshing={isFetching}
            // onEndReached={()=>{}}
            // onEndReachedThreshold={0.5}
            // ListFooterComponent={null}
          />
        : null}
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
  list: {
    marginTop: 12,
  }
});
