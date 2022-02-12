import { useWindowDimensions, StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';

import ScreenViewWrapper from '../components/ScreenViewWrapper';

import CloseIcon from '../assets/images/close.png';

import font from '../constants/styleFonts';

const Mock = `
    Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.
  `

export default function AboutScreen({navigation}) {
  const html = `<body style="color: #fff; font-size: 14px; line-height: 22px;">${Mock}</body>`
  const { width } = useWindowDimensions();
  return (
    <ScreenViewWrapper isModalScreen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>About {'BTC'}</Text>
        <Pressable onPress={()=>navigation.goBack()}>
          <Image style={styles.headerIcon} source={CloseIcon} />
        </Pressable>
      </View>
      <ScrollView>
        <RenderHtml 
          style={styles.content}
          contentWidth={width}
          source={{html}}
        />
      </ScrollView>
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
  content: {
    color: '#fff'
  }
});
