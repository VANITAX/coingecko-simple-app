import { useEffect } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';


// Ref. https://stackoverflow.com/a/17633552
const RANGES = [
  { divider: 1e18, suffix: 'E' },
  { divider: 1e15, suffix: 'P' },
  { divider: 1e12, suffix: 'T' },
  { divider: 1e9, suffix: 'B' },
  { divider: 1e6, suffix: 'M' },
  { divider: 1e3, suffix: 'K' },
];

const NumberWithMetric = (num, fixed) => {
  for (let i = 0; i < RANGES.length; i++) {
    if (num >= RANGES[i].divider) {
      return (num / RANGES[i].divider).toFixed(fixed).toString() + RANGES[i].suffix;
    }
  }
  return num.toString();
};

// Ref. https://stackoverflow.com/a/2901298
const numberWithCommas = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const priceActionColor = num => {
  if(num > 0) {
    return '#76DE93';
  }
  if (num < 0) {
    return '#DE7676';
  }
  return '#FFFFFF';
}

export default function FormatNumberText ({ 
  prefix, 
  suffix, 
  fixed,
  value, 
  format, 
  useColor, 
  usePnMarker, 
  style,
  ...props }){

    if(typeof value !== "number") return null;
    let result = Math.abs(value);
    const ownStyle = [style];
    const isPositiveNum = value > 0;

    if(fixed) {
      result = result.toFixed(fixed);
    }

    if(format !== 'none') {
      if(format === 'metric') result = NumberWithMetric(Number(result), fixed);
      if(format === 'commas') result = numberWithCommas(Number(result));
    }

    if(usePnMarker) {
      result = `${isPositiveNum ? '+' : '-'}${prefix}${result}`;
    }else{
      result = `${prefix}${result}`;
    }
    if(suffix && format !== 'metric') {
      result = `${result}${suffix}`;
    }

    if(useColor) {
      ownStyle.push({ color: priceActionColor(value) });
    }

    return (
      <Text {...props} style={ownStyle}>{result}</Text>
    )
}

FormatNumberText.propTypes = {
  format: PropTypes.oneOf(['metric', 'commas', 'none']),
  useColor: PropTypes.bool,
  usePnMarker: PropTypes.bool,
  prefix: PropTypes.string, 
  suffix: PropTypes.string,
  value: PropTypes.number,
  fixed: PropTypes.number,
};

FormatNumberText.defaultProps = {
  format: 'none',
  useColor: false,
  usePnMarker: false,
  prefix: '',
  suffix: '',
  value: '', 
  fixed: 0,
};