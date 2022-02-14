import { useWindowDimensions, View, Text, StyleSheet } from 'react-native';
import { useCallback, useMemo } from 'react';
import { LineChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';
import useCurrencySymbol from '../hooks/useCurrencySymbol';
import FormatNumberText from '../components/FormatNumberText';
import Spinner from '../components/Spinner';
import font from '../constants/styleFonts';

const CHART_LINE_COLOR = '#6EF183';
const CHART_HEIGHT = 150;

const getDataHL = (data) => {
  const result = { high: null, low: null };
  if(!data?.length) return result;
  data.forEach((value, i)=>{
    if(i === 0){
      result.high = value;
      result.low = value;
    }
    if(value > result.high) result.high = value;
    if(value < result.low) result.low = value;
  });
  return result;
}

const renderLoading = () => (
  <View style={styles.loading}>
    <Spinner />
  </View>
)

// temporary not supported for date range selection.
export default function TrendLineChart({ data, style, currency, isFetching }) {
  const { width } = useWindowDimensions();
  const color = useCallback(() => CHART_LINE_COLOR, []);
  const currencySymbol = useCurrencySymbol(currency);
  const { high, low } = useMemo(()=> getDataHL(data),[data]);
  const chartWidth = width + 70; // adding hardcode "70px" to fix chart library will not to auto filling width bug.
  return (
    <View style={styles.container}>
      <FormatNumberText
        style={[styles.hlPriceLabel, styles.highPrice]}
        prefix={currencySymbol} 
        fixed={3}
        format="commas" 
        value={high}
      />
      { isFetching
        ? renderLoading()
        : <LineChart
            data={{
              datasets: [{ data }],
            }}
            width={chartWidth}
            height={CHART_HEIGHT}
            withDots={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            withHorizontalLines={false}
            withVerticalLines={false}
            withOuterLines={false}
            withShadow={false}
            chartConfig={{color}}
            style={styles.chart}
            bezier
          />
      }
      <View style={styles.chartFooter}>
        <FormatNumberText
          style={[styles.hlPriceLabel, styles.lowPrice]}
          prefix={currencySymbol} 
          fixed={3}
          format="commas" 
          value={low}
        />
        <Text style={styles.dataRangeLabel}>Range: 1 Week</Text>
      </View>
    </View>
  );
};

TrendLineChart.propTypes = {
  data: PropTypes.array, 
  currency: PropTypes.string, 
  isFetching: PropTypes.bool,
};

TrendLineChart.defaultProps = {
  data: [],
  currency: '',
  isFetching: false,
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  hlPriceLabel: {
    fontSize: 16,
    color: '#fff',
    ...font.roboto.bold
  },
  highPrice: {
    alignSelf: 'flex-end',
  },
  lowPrice: {
    alignSelf: 'flex-start',
  },
  chart: {
    transform: ([
      { translateX: -65 }
    ])
  },
  chartFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  dataRangeLabel: {
    fontSize: 14,
    color: '#B1B1B1',
    ...font.roboto.regular
  },
  loading: {
    height: CHART_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  }
})