
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import ScreenViewWrapper from '../components/ScreenViewWrapper';

import { 
  sortOptions,  
  currenciesOptions 
} from '../constants/filterOptions';

import CloseIcon from '../assets/images/close.png';
import CheckIcon from '../assets/images/check.png';

import font from '../constants/styleFonts';


export default function FilterSelectScreen ({
  navigation,
  filterKind, 
  screen, 
  current_selected,
  selectOptions
}) {
  let title;
  if(filterKind === 'sort_by') title = 'Sort By';
  if(filterKind === 'currency') title = 'Currency Select';
  const filterOptions = {
    sort_by: sortOptions,
    currency: currenciesOptions
  }[filterKind];
  const renderItems = filterOptions.map((option, i) => {
    const isLast = filterOptions.length - 1 === i;
    const isSelected = current_selected === option.id;
    const symbol = option.symbol || '';
    return (
      <Pressable 
        style={styles.option(isLast)}
        onPress={() => selectOptions({screen, filter: filterKind, value: option.id})}
      >
        <Text style={styles.optionText}>{option.desc}</Text>
        {isSelected ? <Image style={styles.optionIcon} source={CheckIcon}/> : null}
      </Pressable>
    );
  })

  return (
    <ScreenViewWrapper isModalScreen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Pressable onPress={()=>navigation.goBack()}>
          <Image style={styles.headerIcon} source={CloseIcon} />
        </Pressable>
      </View>
      <View style={styles.selectOptions}>
        {renderItems}
      </View>
    </ScreenViewWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIcon: {
    width: 22,
    height: 22,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    paddingLeft: 22,
    ...font.roboto.bold
  },
  selectOptions: {
    backgroundColor: '#232323',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  option: (isLast) => ({
    width: '100%',
    borderBottomWidth: isLast ? 0 : 1, 
    borderColor: '#343333',
    borderStyle: 'solid',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 6,
    justifyContent: 'space-between',
  }),
  optionText: {
    color: '#fff',
    fontSize: 16,
    ...font.roboto.regular
  },
  optionIcon: {
    width: 18,
    height: 18,
  }
});