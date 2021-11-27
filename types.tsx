/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type Exchange = {
  ToCurrency: string,
  ToCurrencyValue: number,
  FromCurrency: string,
  FromCurrencyValue: number
};

export type XchangrAppState = {
  Exchanges: Exchange[],
  IsLoading: boolean,
  AddExchange: (exchange: Exchange) => Promise<void>,
  DeleteExchange: (exchange: Exchange) => Promise<void>
};

export type CalculatorProps = {
  Exchange: Exchange
};

export type ExchangeListItemProps = {
  Exchange: Exchange,
  DeleteExchange: (exchange: Exchange) => Promise<void>
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
