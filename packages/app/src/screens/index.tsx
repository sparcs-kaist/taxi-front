import type { RootStackParamList } from "@/navigation/types";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Chatting } from "./Chatting";
import { Event } from "./Event";
import { Home } from "./Home";
// import { HomeTab } from "./HomeTab";
import { Web } from "./Web";

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack: React.FC = () => {
  return (
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
  );
};
