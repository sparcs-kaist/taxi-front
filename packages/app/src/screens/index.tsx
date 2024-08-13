import type { RootStackParamList } from "@/navigation/types";
import { createStackNavigator } from "@react-navigation/stack";
import defaultConfig from "@tamagui/config/v3";
import React from "react";
import { TamaguiProvider, createTamagui } from "tamagui";

import { Chatting } from "./Chatting";
import { Event } from "./Event";
import { Home } from "./Home";
// import { HomeTab } from "./HomeTab";
import { Web } from "./Web";

import { RecoilRoot } from "recoil";

const Stack = createStackNavigator<RootStackParamList>();

const config = createTamagui(defaultConfig);

export const RootStack: React.FC = () => {
  return (
    <RecoilRoot>
      <TamaguiProvider config={config}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Chatting" component={Chatting} />
          <Stack.Screen name="Event" component={Event} />
          <Stack.Screen
            name="Web"
            options={{ headerShown: true, headerBackTitle: "" }}
            component={Web}
          />
        </Stack.Navigator>
      </TamaguiProvider>
    </RecoilRoot>
  );
};
