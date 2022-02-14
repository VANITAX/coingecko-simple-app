import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  Image, 
  Linking,
  FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { 
  sortOptions,  
  currenciesOptions 
} from '../constants/filterOptions';
import OptionsIcon from '../assets/images/options.png';
import ExchangeIcon from '../assets/images/exchange.png';
import font from '../constants/styleFonts';

const getSortOptionsDesc = sortId => {
  return sortOptions.filter(({id})=>sortId === id)[0]?.desc || ''
};

export default function FilterColumn({
  screen,
  sorting,
  currency,
  useSortSelector,
  useCurrencySelector
}) {
  const navigation = useNavigation();
  const optionDesc = useMemo(()=>
    getSortOptionsDesc(sorting), 
    [sorting]
  );

  return (
     <View style={styles.filterContainer}>
      { useSortSelector ? 
        <Pressable 
          style={styles.filterButton}
          onPress={()=>navigation.navigate('SortSelect', { screen })} 
        >
          <Image style={styles.filterIcon} source={OptionsIcon} />
          <Text style={styles.filterButtonText}>By {optionDesc}</Text>
        </Pressable>
      : null}
      { useCurrencySelector ? 
        <Pressable 
          style={styles.filterButton}
          onPress={()=>navigation.navigate('CurrencySelect',{ screen })} 
        >
          <Image style={styles.filterIcon} source={ExchangeIcon} />
          <Text style={styles.filterButtonText}>{currency.toUpperCase()}</Text>
        </Pressable>
      : null}
    </View>
  )
}

FilterColumn.propTypes = {
  sorting: PropTypes.string, 
  currency: PropTypes.string,
};

FilterColumn.defaultProps = {
  sorting: '', 
  currency: '',
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
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
})