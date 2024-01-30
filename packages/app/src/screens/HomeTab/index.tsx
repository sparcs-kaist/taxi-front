import type { HomeTabParamList } from "@/navigation/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { AddRoom } from "./AddRoom";
import { Home } from "./Home";
import { MyPage } from "./MyPage";
import { MyRoom } from "./MyRoom";
import { Search } from "./Search";

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const HomeTab: React.FC = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" options={{ title: "홈" }} component={Home} />
    <Tab.Screen name="Search" options={{ title: "검색" }} component={Search} />
    <Tab.Screen
      name="AddRoom"
      options={{ title: "개설" }}
      component={AddRoom}
    />
    <Tab.Screen name="MyRoom" options={{ title: "내 방" }} component={MyRoom} />
    <Tab.Screen name="MyPage" options={{ title: "마이" }} component={MyPage} />
  </Tab.Navigator>
);
