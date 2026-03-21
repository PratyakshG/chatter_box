import { redis } from "@/lib/redis";
import { InferRealtimeEvents, Realtime } from "@upstash/realtime";
import z from "zod/v4";

//message or destroy event for realtime

const message = z.object({
  id: z.string(),
  sender: z.string(),
  text: z.string(),
  timestamp: z.number(),
  roomId: z.string(),
  token: z.string().optional(), //optional -> to prevent any security leaks
});

const schema = {
  chat: {
    message,
    destroy: z.object({
      isDestroyed: z.literal(true),
    }),
  },
};

export const realtime = new Realtime({ schema, redis });
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>;
export type Message = z.infer<typeof message>;
