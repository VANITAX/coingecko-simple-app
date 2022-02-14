
import { 
  currenciesOptions 
} from '../constants/filterOptions';

 const useCurrencySymbol = (currency) => {
   const [ current ] = currenciesOptions.filter(({
    id
  }) =>currency === id);
  return current.symbol || '';
};

export default useCurrencySymbol;