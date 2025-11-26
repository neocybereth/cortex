import { z } from "zod";

// Common schemas
export const DateRangeSchema = z.object({
  start_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .describe("Start date in YYYY-MM-DD format"),
  end_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .describe("End date in YYYY-MM-DD format"),
  next_token: z.string().optional().describe("Pagination token"),
});

export const WebhookSubscriptionSchema = z.object({
  callback_url: z
    .string()
    .url()
    .describe("HTTPS URL where webhook events will be sent"),
  verification_token: z
    .string()
    .describe("Secret token for webhook verification"),
  event_type: z
    .enum(["create", "update", "delete"])
    .describe("Type of events to subscribe to"),
  data_type: z
    .enum([
      "tag",
      "enhanced_tag",
      "workout",
      "session",
      "sleep",
      "daily_sleep",
      "daily_readiness",
      "daily_activity",
      "daily_stress",
    ])
    .describe("Type of data to receive events for"),
});

export const WebhookDeleteSchema = z.object({
  id: z.string().describe("ID of the webhook subscription to delete"),
});

// Response types
export interface OuraResponse<T> {
  data: T;
  next_token?: string | null;
}

export interface PersonalInfo {
  id: string;
  age: number;
  weight: number;
  height: number;
  biological_sex: string;
  email: string;
}

export interface SleepData {
  id: string;
  day: string;
  score?: number;
  timestamp?: string;
  contributors?: {
    deep_sleep?: number;
    efficiency?: number;
    latency?: number;
    rem_sleep?: number;
    restfulness?: number;
    timing?: number;
    total_sleep?: number;
  };
  bedtime_start?: string;
  bedtime_end?: string;
  average_breath?: number;
  average_heart_rate?: number;
  average_hrv?: number;
  awake_time?: number;
  deep_sleep_duration?: number;
  efficiency?: number;
  latency?: number;
  light_sleep_duration?: number;
  low_battery_alert?: boolean;
  lowest_heart_rate?: number;
  movement_30_sec?: string;
  period?: number;
  readiness_score_delta?: number;
  rem_sleep_duration?: number;
  restless_periods?: number;
  sleep_phase_5_min?: string;
  time_in_bed?: number;
  total_sleep_duration?: number;
  type?: string;
}

export interface ActivityData {
  id: string;
  class_5_min?: string;
  score?: number;
  active_calories: number;
  average_met_minutes?: number;
  contributors?: {
    meet_daily_targets?: number;
    move_every_hour?: number;
    recovery_time?: number;
    stay_active?: number;
    training_frequency?: number;
    training_volume?: number;
  };
  equivalent_walking_distance?: number;
  high_activity_met_minutes?: number;
  high_activity_time?: number;
  inactivity_alerts?: number;
  low_activity_met_minutes?: number;
  low_activity_time?: number;
  medium_activity_met_minutes?: number;
  medium_activity_time?: number;
  met?: {
    interval: number;
    items: number[];
    timestamp: string;
  };
  meters_to_target?: number;
  non_wear_time?: number;
  resting_time?: number;
  sedentary_met_minutes?: number;
  sedentary_time?: number;
  steps: number;
  target_calories?: number;
  target_meters?: number;
  total_calories?: number;
  day: string;
  timestamp?: string;
}

export interface ReadinessData {
  id: string;
  day: string;
  score?: number;
  temperature_deviation?: number;
  temperature_trend_deviation?: number;
  timestamp?: string;
  contributors?: {
    activity_balance?: number;
    body_temperature?: number;
    hrv_balance?: number;
    previous_day_activity?: number;
    previous_night?: number;
    recovery_index?: number;
    resting_heart_rate?: number;
    sleep_balance?: number;
  };
}

export interface HeartRateData {
  bpm: number;
  source: string;
  timestamp: string;
}

export interface WorkoutData {
  id: string;
  activity: string;
  calories?: number;
  day: string;
  distance?: number;
  start_datetime: string;
  end_datetime: string;
  intensity?: string;
  label?: string;
  source?: string;
  heart_rate?: {
    interval: number;
    items: number[];
    timestamp: string;
  };
}

export interface SessionData {
  id: string;
  day: string;
  start_datetime: string;
  end_datetime: string;
  type: string;
  heart_rate?: {
    interval: number;
    items: number[];
    timestamp: string;
  };
  heart_rate_variability?: {
    interval: number;
    items: number[];
    timestamp: string;
  };
  mood?: string;
  motion_count?: {
    interval: number;
    items: number[];
    timestamp: string;
  };
}

export interface TagData {
  id: string;
  tag_type_code: string;
  start_time: string;
  end_time: string;
  start_day: string;
  end_day: string;
  comment?: string;
}

export interface SleepTimeData {
  id: string;
  day: string;
  optimal_bedtime?: {
    day_tz: number;
    end_offset: number;
    start_offset: number;
  };
  recommendation?: string;
  status?: string;
}

export interface RestModePeriod {
  id: string;
  start_day: string;
  end_day: string;
  episodes: Array<{
    tags: string[];
    timestamp: string;
  }>;
}

export interface RingConfiguration {
  id: string;
  color: string;
  design: string;
  firmware_version: string;
  hardware_type: string;
  set_up_at: string;
  size: number;
}

export interface DailyStressData {
  id: string;
  day: string;
  day_summary?: string;
  stress_high?: number;
  recovery_high?: number;
  day_summary_values?: {
    stress_high?: number;
    recovery_high?: number;
    day_summary?: string;
  };
}

export interface WebhookSubscription {
  id: string;
  callback_url: string;
  event_type: string;
  data_type: string;
  expiration_time: string;
}

