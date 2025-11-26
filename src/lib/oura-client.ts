import type {
  OuraResponse,
  PersonalInfo,
  SleepData,
  ActivityData,
  ReadinessData,
  HeartRateData,
  WorkoutData,
  SessionData,
  TagData,
  SleepTimeData,
  RestModePeriod,
  RingConfiguration,
  WebhookSubscription,
} from "./types";

const OURA_API_BASE = "https://api.ouraring.com/v2";

export interface OuraClientConfig {
  accessToken: string;
  clientId?: string;
  clientSecret?: string;
  baseUrl?: string;
}

export class OuraClient {
  private accessToken: string;
  private clientId?: string;
  private clientSecret?: string;
  private baseUrl: string;

  constructor(config: OuraClientConfig) {
    this.accessToken = config.accessToken;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.baseUrl = config.baseUrl || OURA_API_BASE;

    console.log("[Oura Client] Initialized with token length:", this.accessToken?.length);
  }

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log(`[Oura Client] Fetching: ${url}`);

    const headers: HeadersInit = {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log(`[Oura Client] Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Oura Client] API Error:`, {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(
          `Oura API error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log(`[Oura Client] Success, data keys:`, Object.keys(data));
      return data;
    } catch (error) {
      console.error(`[Oura Client] Fetch error:`, error);
      throw error;
    }
  }

  private buildQueryString(params: Record<string, string | undefined>): string {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        query.append(key, value);
      }
    });
    const queryString = query.toString();
    return queryString ? `?${queryString}` : "";
  }

  // Personal Information
  async getPersonalInfo(): Promise<PersonalInfo> {
    return this.fetch<PersonalInfo>("/usercollection/personal_info");
  }

  // Sleep endpoints
  async getDailySleep(
    startDate?: string,
    endDate?: string,
    nextToken?: string
  ): Promise<OuraResponse<SleepData[]>> {
    const query = this.buildQueryString({
      start_date: startDate,
      end_date: endDate,
      next_token: nextToken,
    });
    return this.fetch<OuraResponse<SleepData[]>>(
      `/usercollection/daily_sleep${query}`
    );
  }

  async getSleep(
    startDate?: string,
    endDate?: string,
    nextToken?: string
  ): Promise<OuraResponse<SleepData[]>> {
    const query = this.buildQueryString({
      start_date: startDate,
      end_date: endDate,
      next_token: nextToken,
    });
    return this.fetch<OuraResponse<SleepData[]>>(
      `/usercollection/sleep${query}`
    );
  }

  async getSleepTime(
    startDate?: string,
    endDate?: string,
    nextToken?: string
  ): Promise<OuraResponse<SleepTimeData[]>> {
    const query = this.buildQueryString({
      start_date: startDate,
      end_date: endDate,
      next_token: nextToken,
    });
    return this.fetch<OuraResponse<SleepTimeData[]>>(
      `/usercollection/sleep_time${query}`
    );
  }

  // Activity endpoints
  async getDailyActivity(
    startDate?: string,
    endDate?: string,
    nextToken?: string
  ): Promise<OuraResponse<ActivityData[]>> {
    const query = this.buildQueryString({
      start_date: startDate,
      end_date: endDate,
      next_token: nextToken,
    });
    return this.fetch<OuraResponse<ActivityData[]>>(
      `/usercollection/daily_activity${query}`
    );
  }

  // Readiness endpoints
  async getDailyReadiness(
    startDate?: string,
    endDate?: string,
    nextToken?: string
  ): Promise<OuraResponse<ReadinessData[]>> {
    const query = this.buildQueryString({
      start_date: startDate,
      end_date: endDate,
      next_token: nextToken,
    });
    return this.fetch<OuraResponse<ReadinessData[]>>(
      `/usercollection/daily_readiness${query}`
    );
  }

  // Stress endpoints
  async getDailyStress(
    startDate?: string,
    endDate?: string,
    nextToken?: string
  ): Promise<OuraResponse<any[]>> {
    const query = this.buildQueryString({
      start_date: startDate,
      end_date: endDate,
      next_token: nextToken,
    });
    return this.fetch<OuraResponse<any[]>>(
      `/usercollection/daily_stress${query}`
    );
  }

  // Heart rate endpoints
  async getHeartRate(
    startDate?: string,
    endDate?: string,
    nextToken?: string
  ): Promise<OuraResponse<HeartRateData[]>> {
    const query = this.buildQueryString({
      start_date: startDate,
      end_date: endDate,
      next_token: nextToken,
    });
    return this.fetch<OuraResponse<HeartRateData[]>>(
      `/usercollection/heartrate${query}`
    );
  }

  // Workout endpoints
  async getWorkouts(
    startDate?: string,
    endDate?: string,
    nextToken?: string
  ): Promise<OuraResponse<WorkoutData[]>> {
    const query = this.buildQueryString({
      start_date: startDate,
      end_date: endDate,
      next_token: nextToken,
    });
    return this.fetch<OuraResponse<WorkoutData[]>>(
      `/usercollection/workout${query}`
    );
  }

  // Session endpoints
  async getSessions(
    startDate?: string,
    endDate?: string,
    nextToken?: string
  ): Promise<OuraResponse<SessionData[]>> {
    const query = this.buildQueryString({
      start_date: startDate,
      end_date: endDate,
      next_token: nextToken,
    });
    return this.fetch<OuraResponse<SessionData[]>>(
      `/usercollection/session${query}`
    );
  }

  // Tag endpoints
  async getTags(
    startDate?: string,
    endDate?: string,
    nextToken?: string
  ): Promise<OuraResponse<TagData[]>> {
    const query = this.buildQueryString({
      start_date: startDate,
      end_date: endDate,
      next_token: nextToken,
    });
    return this.fetch<OuraResponse<TagData[]>>(
      `/usercollection/tag${query}`
    );
  }

  async getEnhancedTags(
    startDate?: string,
    endDate?: string,
    nextToken?: string
  ): Promise<OuraResponse<TagData[]>> {
    const query = this.buildQueryString({
      start_date: startDate,
      end_date: endDate,
      next_token: nextToken,
    });
    return this.fetch<OuraResponse<TagData[]>>(
      `/usercollection/enhanced_tag${query}`
    );
  }

  // Rest mode endpoints
  async getRestModePeriods(
    startDate?: string,
    endDate?: string,
    nextToken?: string
  ): Promise<OuraResponse<RestModePeriod[]>> {
    const query = this.buildQueryString({
      start_date: startDate,
      end_date: endDate,
      next_token: nextToken,
    });
    return this.fetch<OuraResponse<RestModePeriod[]>>(
      `/usercollection/rest_mode_period${query}`
    );
  }

  // Ring configuration endpoints
  async getRingConfiguration(
    startDate?: string,
    endDate?: string,
    nextToken?: string
  ): Promise<OuraResponse<RingConfiguration[]>> {
    const query = this.buildQueryString({
      start_date: startDate,
      end_date: endDate,
      next_token: nextToken,
    });
    return this.fetch<OuraResponse<RingConfiguration[]>>(
      `/usercollection/ring_configuration${query}`
    );
  }

  // Webhook endpoints (require OAuth credentials)
  async getWebhookSubscriptions(): Promise<OuraResponse<WebhookSubscription[]>> {
    if (!this.clientId || !this.clientSecret) {
      throw new Error(
        "Webhook operations require clientId and clientSecret"
      );
    }
    return this.fetch<OuraResponse<WebhookSubscription[]>>(
      `/webhook/subscription`
    );
  }

  async createWebhookSubscription(
    callbackUrl: string,
    verificationToken: string,
    eventType: string,
    dataType: string
  ): Promise<WebhookSubscription> {
    if (!this.clientId || !this.clientSecret) {
      throw new Error(
        "Webhook operations require clientId and clientSecret"
      );
    }
    return this.fetch<WebhookSubscription>(`/webhook/subscription`, {
      method: "POST",
      body: JSON.stringify({
        callback_url: callbackUrl,
        verification_token: verificationToken,
        event_type: eventType,
        data_type: dataType,
      }),
    });
  }

  async deleteWebhookSubscription(id: string): Promise<void> {
    if (!this.clientId || !this.clientSecret) {
      throw new Error(
        "Webhook operations require clientId and clientSecret"
      );
    }
    await this.fetch<void>(`/webhook/subscription/${id}`, {
      method: "DELETE",
    });
  }
}

