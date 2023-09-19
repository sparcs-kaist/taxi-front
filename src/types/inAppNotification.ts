export type PopupInAppNotification = (
  | { type: "chat"; profileUrl?: string; imageUrl?: never }
  | { type: "default"; imageUrl?: string; profileUrl?: never }
) & {
  title?: string;
  subtitle?: string;
  content?: string;
  button?: { text: string; path: string };
};
