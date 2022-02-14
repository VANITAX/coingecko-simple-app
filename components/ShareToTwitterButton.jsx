import { 
  StyleSheet, 
  View, 
  Pressable,
  Linking,
  Image 
} from 'react-native';
import { useCallback, useMemo } from 'react';
import { useStore } from 'react-redux';
import PropTypes from 'prop-types';
import ShareIcon from '../assets/images/share.png';
import { sortOptions } from '../constants/filterOptions';

const HASH_TAGS = ['Crypto', 'Bitcoin', 'BTC', 'Blockchain'];
const TWITTER_BASE_URL = 'https://twitter.com';

const getSortOptionsDesc = sortId => {
  return sortOptions.filter(({id})=>sortId === id)[0]?.desc || ''
};

const extractText = ({dataKey, state, index}) => {
  const vs_currency = dataKey?.split(':')[1];
  const symbol = state.getIn(['finances', dataKey, 'symbol']);
  const name = state.getIn(['finances', dataKey, 'name']);
  const current_price = state.getIn(['finances', dataKey, 'current_price']);
  const price_change_percentage_24h = state.getIn(['finances', dataKey, 'price_change_percentage_24h']);
  const plMark = price_change_percentage_24h > 0 ? '+' : '-';
  return `
#${index+1} ${name}/${symbol?.toUpperCase()}  ${current_price}${vs_currency?.toUpperCase()} ${plMark}${Math.abs(price_change_percentage_24h)}%`;
}

export default function ShareToTwitterButton ({ count = 10, ids=[] }){
  const store = useStore();
  const reduxState = store.getState();
  const sortby = reduxState.getIn(['filters', 'list', 'sort_by']);
  const sortDesc = getSortOptionsDesc(sortby);
  const postTemplate = text => {
    return `Top 10 by ${sortDesc}
      ${text}
    `;
  };

  const sharePost = useCallback(() => {
    const postText = ()=>{
      let result = '';
      for(let i=0; i < count; i++){
        const dataKey = ids[i];
        result += extractText({ dataKey, state: reduxState, index: i});
      }
      return result;
    }
    const shareUrl = new URL('/intent/tweet', TWITTER_BASE_URL);
    shareUrl.searchParams.append('text', postTemplate(postText()));
    shareUrl.searchParams.append('hashtags', HASH_TAGS.toString());
    Linking.openURL(shareUrl.href);
  }, [ids]);

  return (
    <Pressable onPress={sharePost}>
      <Image style={styles.headerIcon} source={ShareIcon} />
    </Pressable>
  );
}

ShareToTwitterButton.propTypes = {
  count: PropTypes.number, 
  ids: PropTypes.array,
};

ShareToTwitterButton.defaultProps = {
  count: 0,
  ids: [],
};

const styles = StyleSheet.create({
  headerIcon: {
    width: 22,
    height: 22,
  }
});