import { useCallback, useMemo } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { useWindowDimensions, View, Text, StyleSheet } from 'react-native';
import FormatNumberText from '../components/FormatNumberText';
import font from '../constants/styleFonts';

const CHART_LINE_COLOR = '#6EF183';

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

// temporary not supported for date range selection.
export default function TrendLineChart({ data, style }) {
  const { width } = useWindowDimensions();
  const color = useCallback(() => CHART_LINE_COLOR, []);
  const { high, low } = useMemo(()=> getDataHL(data),[data]);
  const chartWidth = width + 70; // adding hardcode "70px" to fix chart library will not to auto filling width bug.
  return (
    <View style={styles.container}>
      <FormatNumberText
        style={[styles.hlPriceLabel, styles.highPrice]}
        prefix="$" 
        fixed={2}
        format="commas" 
        value={high}
      />
      <LineChart
        data={{
          datasets: [{ data }],
        }}
        width={chartWidth}
        height={150}
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
      <View style={styles.chartFooter}>
        <FormatNumberText
          style={[styles.hlPriceLabel, styles.lowPrice]}
          prefix="$" 
          fixed={2}
          format="commas" 
          value={low}
        />
        <Text style={styles.dataRangeLabel}>Range: 1 Week</Text>
      </View>
    </View>
  );
}

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
  }
})