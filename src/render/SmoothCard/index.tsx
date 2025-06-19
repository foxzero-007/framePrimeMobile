import { StyleSheet, Text, View } from "react-native"
import Swiper from "react-native-deck-swiper"
import { useTailwind } from "tailwind-rn";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

const SmoothCard = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 bg-black')}>
      <Swiper
        cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
        renderCard={(card) => {
          return (
            <View style={tailwind('flex-1 rounded-sm border-2 border-red-400 justify-center bg-slate-100')}>
              <Text style={styles.text}>{card}</Text>
            </View>
          )
        }}
        onSwiped={(cardIndex) => { console.log(cardIndex) }}
        onSwipedAll={() => { console.log('onSwipedAll') }}
        cardIndex={0}
        backgroundColor={'#4FD0E9'}
        stackSize={3}>
        {/* <Button
                onPress={() => {console.log('oulala')}}
                title="Press me">
                You can press me
            </Button> */}
      </Swiper>
    </View>)
}

export default SmoothCard