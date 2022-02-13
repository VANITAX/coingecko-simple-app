import { 
  StyleSheet, 
  Text, 
  TextInput,
  ScrollView,
  View, 
  Pressable, 
  Image, 
  FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import FiltersColumn from '../containers/FiltersColumn';
import ScreenViewWrapper from '../components/ScreenViewWrapper';
import PairItem from '../components/PairItem';

import font from '../constants/styleFonts';

import SearchIcon from '../assets/images/search.png';
import CloseIcon from '../assets/images/close.png';

const MockData = [
  "bitcoin",
  "ethereum",
];


export default function SearchScreen({ navigation }){
  const [searchValue, setSearchValue] = useState('');

  const renderItem = ({ item:id }) => {
    return (
      <Pressable 
        onPress={() => {
          navigation.popToTop();
          setTimeout(() => {
            navigation.navigate('PairDetail', { params: { id }})
          },500);
        }}>
        <PairItem id={id}/>
      </Pressable>
    )
  };

  return (
    <ScreenViewWrapper isModalScreen>
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
            onSubmitEditing={()=>{}}
            onChangeText={value => setSearchValue(value)}
            value={searchValue}
          />
        </View>
        <Pressable onPress={()=>navigation.goBack()}>
          <Image style={styles.headerIcon} source={CloseIcon} />
        </Pressable>
      </View>
      <FiltersColumn 
        screen="search" 
        useCurrencySelector
      />
      <FlatList 
        style={styles.list}
        data={MockData} 
        renderItem={renderItem} 
        keyExtractor={id => id} 
        ListEmptyComponent={null}
        onRefresh={()=>{}}
        refreshing={false}
      />
    </ScreenViewWrapper>
  )
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
  }
});