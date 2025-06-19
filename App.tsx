/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import SmoothCard from './src/render/SmoothCard';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    /** @ts-ignore */
    <TailwindProvider utilities={utilities}>
      <View style={styles.container}>
        <SmoothCard></SmoothCard>
      </View>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
