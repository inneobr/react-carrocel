import { useFonts, Tangerine_400Regular, Tangerine_700Bold } from '@expo-google-fonts/tangerine';
import { ActivityIndicator, Animated, Dimensions, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
const {width, height} = Dimensions.get('window');
import Svg,  *  as Svge from 'react-native-svg';
const { Defs, RadialGradient, Stop, Rect } = Svge;

const CATALOG_LIST = [ 
  {
    name: 'Baby Doll Rosa',
    description: 'Para você se sentir leve e atraente.',
    patch: require('./assets/BabyDollRosa.png'),
    price: '249,90',
    bg: '#f9b5ec'
  },
  {
    name: 'Baby Doll Black',
    description: 'Para você se sentir leve e atraente.',
    patch: require('./assets/BabyDollBlack.png'),
    price: '249,90',
    bg: '#393839'
  },
  {
    name: 'Baby Doll Red',
    description: 'Para você se sentir leve e atraente.',
    patch: require('./assets/BabyDollRed.png'),
    price: '249,90',
    bg: '#fb4f4f'
  },  
  {
    name: 'Baby Doll Blue',
    description: 'Para você se sentir leve e atraente.',
    patch: require('./assets/BabyDollBlue.png'),
    price: '249,90',
    bg: '#4549ab'
  }, 
  {
    name: 'Baby Doll Yellow',
    description: 'Para você se sentir leve e atraente.',
    patch: require('./assets/BabyDollYellow.png'),
    price: '249,90',
    bg: '#f0f996'
  },  
  
  {
    name: 'Baby Doll Seda',
    description: 'Para você se sentir leve e atraente.',
    patch: require('./assets/BabyDollSeda.png'),
    price: '249,90',
    bg: '#bfc0b7'
  }, 
]
const _scrollX = new Animated.Value(0); 
export default function App() {
  
  let [fontsLoaded] = useFonts({
    Tangerine_400Regular,
    Tangerine_700Bold,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  } else {
    return (
    <View style={styles.container}>
      <StatusBar hidden/>      
      <Animated.ScrollView 
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: {contentOffset: {x: _scrollX}}}],
          {useNativeDriver: true}
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContainer}>
        {CATALOG_LIST.map((item, i) => _renderItem(item, i))}
      </Animated.ScrollView>
      <Image source={require('./assets/logo.png')} style={[styles.imgLogo]}/>
      <Text style={[styles.footer]}>contato: contato@solangerie.com.br</Text>
    </View>
  );
}
}

const _renderItem = (item: any, i: number) =>{  
  const inputRange = [ (i-2) * width, (i-1) * width,  i * width, (i+1) * width ];
  const imageScale = _scrollX.interpolate({
    inputRange,
    outputRange: [1, 0.1, 1, 0.1]
  });

  const imageOpacity = _scrollX.interpolate({
    inputRange,
    outputRange: [1, 0.1, 1, 0.1]
  });
  

  return (
    <View key={i} style={[styles.container, styles.item]}>
      <Animated.Image source={item.patch} style={[styles.image, {
        transform: [{
          scale: imageScale
        }],
        opacity: imageOpacity
      }]}/>
      <Animated.View style={[styles.metaContainer, {
        opacity: imageOpacity
      }]}>
        <Text style={[styles.title]}>{item.name}</Text>
        <Text style={[styles.font, styles.description]}>{item.description}</Text>
        <Text style={[styles.font, styles.price]}>{item.price}</Text>
      </Animated.View>
      {_renderRadialGradient(item.bg, inputRange) }
    </View>
  )
}

const _renderRadialGradient = (color: string, inputRange: number[]) => {
  const rotate = _scrollX.interpolate({
    inputRange,
    outputRange: ['0deg','-15deg','0deg','15deg']
  });

  const translateX = _scrollX.interpolate({
    inputRange,
    outputRange: [0, width, 0, -width]
  });
  const opacity = _scrollX.interpolate({
    inputRange,
    outputRange: [1, 0.5, 1 , 0.5]
  });
  return (
    <Animated.View style={[styles.svgContainer, {
      transform: [{
        rotate
      }, 
      {
        translateX
      },
      {
      scale: 1.3
      }
    ],
      opacity
    }]}>
      <Svg height={height} width={width}>
        <Svge.Defs>
          <Svge.RadialGradient id='grad' cx='50%' cy='50%' r='60%' gradientUnits='userSpaceOnUse'>
            <Svge.Stop offset='0' stopColor='#fff' stopOpacity='1'></Svge.Stop >
            <Svge.Stop offset='100' stopColor={color} stopOpacity='1'></Svge.Stop >
          </Svge.RadialGradient>
        </Svge.Defs>
        <Svge.Rect x='0' y='0' width={width} height={height} fill={`url(#grad)`} fillOpacity='0.9'/>
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f996',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer : {
    alignItems: 'center',
    justifyContent: 'center'
  },
  metaContainer: {
    alignContent: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    padding: 15,
  },
  item:{
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: width * .85,
    height: width * .85,
    resizeMode: 'contain'
  },
  font: {
    fontFamily: 'Tangerine_700Bold',
    color: '#222'
  },
  title: {
    fontSize: 36,
    fontWeight: '900'
  },
  description: {
    fontSize: 28,
    marginVertical: 15,
    textAlign: 'center'
  },
  price: {
    fontSize: 42,
    color: '#fb4f4f',
    fontWeight: '400',
    textAlign: 'center',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex : -1
  },
  imgLogo: {
    top: 20,
    width: width / 7,
    height: width / 7,
    position: 'absolute',
    resizeMode: 'contain'
  },
  footer: {
    bottom: 20,   
    width: width,
    fontSize: 28,
    color: '#fb4f4f', 
    height: width / 7,    
    textAlign: 'center',
    position: 'absolute',
    resizeMode: 'contain',
    fontFamily: 'Tangerine_400Regular',
  }
});
