import { env } from "@/env";
import type { RootStackParamList } from "@/navigation/types";
import { shallowEqualObjects } from "shallow-equal";
import URLPattern from "url-pattern";

export const screen = <ScreenName extends keyof RootStackParamList>(
  ...args: // this first condition allows us to iterate over a union type
  // This is to avoid getting a union of all the params from `ParamList[RouteName]`,
  // which will get our types all mixed up if a union RouteName is passed in.
  ScreenName extends unknown
    ? // This condition checks if the params are optional,
      // which means it's either undefined or a union with undefined
      undefined extends RootStackParamList[ScreenName]
      ?
          | [screen: ScreenName] // if the params are optional, we don't have to provide it
          | [screen: ScreenName, params: RootStackParamList[ScreenName]]
      : [screen: ScreenName, params: RootStackParamList[ScreenName]]
    : never
) => args;

type Screen = ReturnType<typeof screen>;

type ExtractRouteParams<T extends string> = string extends T
  ? Record<string, string>
  : T extends `${infer Start}:${infer Param}/${infer Rest}`
  ? { [K in Param | keyof ExtractRouteParams<Rest>]: string }
  : T extends `${infer Start}:${infer Param}`
  ? { [K in Param]: string }
  : {};

type Route = (route: string) => Screen | null;
/**
 * @example
 * route("/posts/:postId", ({ postId }) => Screen("Post", { postId }));
 * @param routePattern
 * @param getScreen
 */
export const route = <Pattern extends string>(
  routePattern: Pattern,
  getScreen: (params: ExtractRouteParams<Pattern>) => Screen
): Route => {
  const pattern = new URLPattern(routePattern);

  return (pathname: string) => {
    const params = pattern.match(pathname);

    return params && getScreen(params);
  };
};

export const getPath = (route: string) => {
  const match = route.match(new RegExp(`^${env.SERVER_URL}([\\w\\/]+)\\??`));
  return match?.[1];
};

export const routes = (routes: Route[]) => (uri: string) => {
  const path = getPath(uri);
  if (!path) return screen("Web", { uri });

  for (const route of routes) {
    const screen = route(path);
    if (screen) return screen;
  }
  return screen("Web", { uri });
};

export const isSameScreen = (
  screen1: Screen,
  screen2: Screen
): screen1 is Screen => {
  const [screenName1, params1] = screen1;
  const [screenName2, params2] = screen2;
  if (screenName1 === "Web" && screenName2 === "Web") return true;
  return screenName1 === screenName2 && shallowEqualObjects(params1, params2);
};
