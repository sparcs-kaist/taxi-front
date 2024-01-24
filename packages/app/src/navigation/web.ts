import { route, routes, screen } from "@/utils/navigation";

export const mapWebRoutes = routes([
  route("/", () => screen("HomeTab", { screen: "Home" })),
  route("/home(/:roomId)", () => screen("HomeTab", { screen: "Home" })),
  route("/event/:eventName", ({ eventName }) => screen("Event", { eventName })),
  route("/search", () => screen("HomeTab", { screen: "Search" })),
  route("/addroom", () => screen("HomeTab", { screen: "AddRoom" })),
  route("/myroom", () => screen("HomeTab", { screen: "MyRoom" })),
  route("/myroom/:roomId", ({ roomId }) => screen("Chatting", { roomId })),
  route("/mypage", () => screen("HomeTab", { screen: "MyPage" })),
  route("/chatting/:roomId", ({ roomId }) => screen("Chatting", { roomId })),
]);
