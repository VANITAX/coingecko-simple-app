
import { 
  currenciesOptions 
} from '../constants/filterOptions';

export default function useCurrencySymbol (currency) {
   const [ current ] = currenciesOptions.filter(({
    id
  }) =>currency === id);
  return current.symbol || '';
};