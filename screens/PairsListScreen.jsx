import { 
  StyleSheet, 
  Text, 
  View, 
  RefreshControl,
  Pressable, 
  Image, 
  Linking,
  FlatList } from 'react-native';
import { Link } from '@react-navigation/native';
import { useEffect, useCallback, useMemo } from 'react';

import usePrevious from '../hooks/usePrevious';

import FiltersColumn from '../containers/FiltersColumn';
import PairItem from '../containers/PairItem';

import ScreenViewWrapper from '../components/ScreenViewWrapper';
import ShareToTwitterButton from '../components/ShareToTwitterButton';
import Spinner from '../components/Spinner';

import font from '../constants/styleFonts';

import ShareIcon from '../assets/images/share.png';
import SearchIcon from '../assets/images/search.png';

export default function PairsListScreen({ 
  navigation, 
  pairItemIds,
  nextPage,
  lastPage,
  isFetching,
  fetchCoinFinanceList,
  clearPairsList,
  currency,
  sorting
}) {

  const renderItem = ({ item: dataKey }) => (
    <Link key={dataKey} to={{screen: 'PairDetail', params: { dataKey }}} >
      <PairItem dataKey={dataKey}/>
    </Link>
  );

  const renderLoading = () => (
    <View style={styles.loading}>
      <Spinner />
    </View>
  );

  const renderPairItem = useMemo(()=>renderItem, []);

  const fetchData = useCallback(() => 
    fetchCoinFinanceList({
      vs_currency: currency,
      order: sorting,
      page: 1,
    }),[currency, sorting])

  const fetchNext = useCallback(() => 
    fetchCoinFinanceList({
      vs_currency: currency,
      order: sorting,
      page: nextPage,
    }),[currency, sorting, nextPage])

  const prevCurrency = usePrevious(currency);

  useEffect(() => {
    if(prevCurrency !== currency) clearPairsList();
  },[currency]);

  useEffect(() => 
    fetchData(),
    [currency, sorting]);

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
          <ShareToTwitterButton ids={pairItemIds}/>
        </View>
      </View>
      <FiltersColumn 
        screen="list" 
        useSortSelector 
        useCurrencySelector
      />
       <FlatList
        style={styles.list}
        data={pairItemIds} 
        renderItem={renderPairItem} 
        initialNumToRender={15}
        keyExtractor={item => item} 
        refreshControl={
        <RefreshControl
          tintColor="#fff"
          refreshing={isFetching}
          onRefresh={fetchData}
        />
      }
        onEndReached={fetchNext}
        onEndReachedThreshold={1}
        ListFooterComponent={ !pairItemIds.length ? null : renderLoading() }
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
    marginRight: 16
  },
  headerTitle: {
    color: '#fff', 
    fontSize: 40,
    ...font.roboto.bold
  },
  list: {
    marginTop: 12,
  },
  loading: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
