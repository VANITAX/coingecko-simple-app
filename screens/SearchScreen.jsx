import { 
  StyleSheet, 
  Text, 
  TextInput,
  ScrollView,
  View, 
  Pressable, 
  Image, 
  FlatList } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import FiltersColumn from '../containers/FiltersColumn';
import PairItem from '../containers/PairItem';
import ScreenViewWrapper from '../components/ScreenViewWrapper';
import Spinner from '../components/Spinner';
import font from '../constants/styleFonts';
import SearchIcon from '../assets/images/search.png';
import CloseIcon from '../assets/images/close.png';

export default function SearchScreen({ 
  navigation,
  itemIds, 
  currency,
  isFetching,
  fetchSearch,
  clearSearchResults,
}){
  const [searchValue, setSearchValue] = useState('');
  const [latestSearchValue, setLatestSearchValue] = useState('');

  const onSubmit = useCallback(() => {
    if(searchValue){
      setLatestSearchValue(searchValue);
      fetchSearch({
        query: searchValue, 
        vs_currency: currency
      })
    }
  }, [searchValue]);

  useEffect(()=>{
    return () => clearSearchResults();
  },[]);

  const renderItem = ({ item: dataKey }) => (
    <Pressable 
      onPress={() => {
        navigation.popToTop();
        setTimeout(() => {
          navigation.navigate('PairDetail', { dataKey })
        },500);
      }}>
      <PairItem dataKey={dataKey}/>
    </Pressable>
  );

  const renderLoading = () => (
    <View style={styles.loading}>
      <Spinner />
    </View>
  );

  const renderEmptyResult = () => {
    if(!latestSearchValue) return null;
    return (
      <View style={styles.emptyResult}>
        <Text style={styles.emptyResultText}>No Results for "{latestSearchValue}"</Text>
      </View>
    )
  };

  return (
    <ScreenViewWrapper>
      <View style={styles.header}>
        <View style={styles.searchInputWrapper}>
          <Image style={styles.searchIcon} source={SearchIcon} />
          <TextInput 
            autoFocus 
            style={styles.searchInput} 
            placeholder="Search"
            placeholderTextColor="#4E4E4E"
            clearButtonMode="while-editing"
            maxLength={30}
            autoCorrect={false}
            onSubmitEditing={onSubmit}
            onChangeText={value => setSearchValue(value)}
            value={searchValue}
          />
        </View>
        <Pressable onPress={()=>navigation.goBack()}>
          <Image style={styles.headerIcon} source={CloseIcon} />
        </Pressable>
      </View>
      { isFetching
        ? renderLoading()
        : <FlatList 
          style={styles.list}
          data={itemIds} 
          renderItem={renderItem} 
          keyExtractor={id => id} 
          ListEmptyComponent={renderEmptyResult()}
        />
      }
    </ScreenViewWrapper>
  )
}

SearchScreen.propTypes = {
  itemIds: PropTypes.array,
  currency: PropTypes.string, 
  isFetching: PropTypes.bool,
  fetchSearch: PropTypes.func,
  clearSearchResults: PropTypes.func,
}

SearchScreen.defaultProps = {
  itemIds: [],
  currency: '',
  isfetching: false,
  fetchSearch: () => null,
  clearSearchResults: () => null
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 38,
  },
  headerIcon: {
    width: 22,
    height: 22,
  },
  searchInputWrapper: {
    flex: 1,
    height: 32,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#232323',
    marginRight: 12,
    borderRadius: 30,
    paddingVertical: 6, 
    paddingLeft: 12,
  },

  searchIcon: {
    width: 20, 
    height: 20, 
    marginRight: 12,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    ...font.roboto.regular
  },
  list: {
    marginTop: 12,
  },
  emptyResult: {
    paddingTop: 52,
    alignItems: 'center',
  },
  emptyResultText: {
    fontSize: 14,
    color: '#fff',
    ...font.roboto.regular
  },
  loading: {
    paddingTop: 52,
    alignItems: 'center',
  }
});