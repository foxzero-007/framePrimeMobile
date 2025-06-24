import { Text, View } from "react-native"
import Swiper from "react-native-deck-swiper"
import "./index.less"

const SmoothCard = () => {
  return (
    <View styleName ="container">
      <Swiper
        cards={['DO', 'MORE', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
        renderCard={(card) => {
          return (
            <View styleName="card">
              <Text styleName="text">{card}</Text>
            </View>
          )
        }}
        onSwiped={(cardIndex) => { console.log(cardIndex) }}
        onSwipedAll={() => { console.log('onSwipedAll') }}
        cardIndex={0}
        backgroundColor={'white'}
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