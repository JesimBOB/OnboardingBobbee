export const isChatEnabled =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_CHAT_ENABLED === "true";
