import { route, routes, screen } from "@/utils/navigation";

export const mapWebRoutes = routes([
  route("/", () => screen("Home")),
  route("/home(/:roomId)", () => screen("Home")),
  route("/event/:eventName", ({ eventName }) => screen("Event", { eventName })),
  route("/search", () => screen("Home")),
  route("/addroom", () => screen("Home")),
  route("/myroom", () => screen("Home")),
  route("/myroom/:roomId", ({ roomId }) => screen("Chatting", { roomId })),
  route("/mypage", () => screen("Home")),
  route("/chatting/:roomId", ({ roomId }) => screen("Chatting", { roomId })),
]);
