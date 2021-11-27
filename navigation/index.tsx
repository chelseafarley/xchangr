/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ExchangesScreen from '../screens/ExchangesScreen';
import AddExchangeScreen from '../screens/AddExchangeScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps, Exchange } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import BeaconContext from './BeaconContext'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [exchanges, setExchanges] = React.useState<Exchange[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getExchanges = async () => {
    const jsonValue = await AsyncStorage.getItem('exchanges')
    const loadedExchanges = jsonValue != null ? JSON.parse(jsonValue) : [];
    setExchanges(loadedExchanges);
    setIsLoading(false);
  }

  const addExchange = async (exchange: Exchange) => {
    let exchangesToUpdate = exchanges;
    exchangesToUpdate.push(exchange);
    await AsyncStorage.setItem('exchanges', JSON.stringify(exchangesToUpdate));
    setExchanges(exchangesToUpdate);
    getExchanges();
  };

  const deleteExchange = async (exchange: Exchange) => {
    const updatedExchanges = exchanges.filter(element => element.FromCurrency !== exchange.FromCurrency || element.FromCurrencyValue !== exchange.FromCurrencyValue || element.ToCurrency !== exchange.ToCurrency || element.ToCurrencyValue !== exchange.ToCurrencyValue);
    await AsyncStorage.setItem('exchanges', JSON.stringify(updatedExchanges));
    setExchanges(updatedExchanges);
  };

  if (isLoading) {
    getExchanges();
  }

  return (
    <BeaconContext.Provider value={{ Exchanges: exchanges, IsLoading: isLoading, DeleteExchange: deleteExchange, AddExchange: addExchange }}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    </BeaconContext.Provider>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={ExchangesScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Exchanges',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={AddExchangeScreen}
        options={{
          title: 'Add Exchange',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
