export type InAppNotification = (
  | { type: "chat"; profileUrl?: string }
  | { type: "default"; imageUrl?: string }
) & {
  title?: string;
  subtitle?: string;
  content?: string;
  button?: { text: string; path: string };
};
