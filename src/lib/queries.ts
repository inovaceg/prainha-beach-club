import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const q = <T,>(key: string, fn: () => PromiseLike<{ data: T | null; error: unknown }>) =>
  queryOptions({ queryKey: ["public", key], queryFn: async () => { const { data, error } = await fn(); if (error) throw error; return (data ?? []) as T; } });

export const courtsQ = q("courts", () => supabase.from("courts").select("*").eq("active", true).order("sort"));
export const modalitiesQ = q("modalities", () => supabase.from("modalities").select("*").eq("active", true).order("sort"));
export const pricesQ = q("prices", () => supabase.from("prices").select("*").order("sort"));
export const menuCatsQ = q("menu_categories", () => supabase.from("menu_categories").select("*").order("sort"));
export const menuItemsQ = q("menu_items", () => supabase.from("menu_items").select("*").eq("active", true).order("sort"));
export const mediaQ = q("media", () => supabase.from("media").select("*").order("sort").order("created_at", { ascending: false }));
export const eventsQ = q("events", () => supabase.from("events").select("*").eq("active", true).order("event_date"));
export const slotsQ = q("time_slots", () => supabase.from("time_slots").select("*").eq("active", true).order("start_time"));
