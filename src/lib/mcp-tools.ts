import { OuraClient } from "./oura-client";

export interface OuraMCPConfig {
  accessToken: string;
  clientId?: string;
  clientSecret?: string;
}

// Core data fetching functions that can be shared between API routes and MCP server
export class OuraMCPTools {
  private client: OuraClient;

  constructor(config: OuraMCPConfig) {
    this.client = new OuraClient({
      accessToken: config.accessToken,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    });
  }

  // Personal Information
  async fetchPersonalInfo() {
    return await this.client.getPersonalInfo();
  }

  // Sleep & Readiness
  async fetchDailySleep(start_date?: string, end_date?: string, next_token?: string) {
    return await this.client.getDailySleep(start_date, end_date, next_token);
  }

  async fetchSleep(start_date?: string, end_date?: string, next_token?: string) {
    return await this.client.getSleep(start_date, end_date, next_token);
  }

  async fetchSleepTime(start_date?: string, end_date?: string, next_token?: string) {
    return await this.client.getSleepTime(start_date, end_date, next_token);
  }

  async fetchDailyReadiness(start_date?: string, end_date?: string, next_token?: string) {
    return await this.client.getDailyReadiness(start_date, end_date, next_token);
  }

  // Activity & Exercise
  async fetchDailyActivity(start_date?: string, end_date?: string, next_token?: string) {
    return await this.client.getDailyActivity(start_date, end_date, next_token);
  }

  async fetchWorkouts(start_date?: string, end_date?: string, next_token?: string) {
    return await this.client.getWorkouts(start_date, end_date, next_token);
  }

  // Sessions & Wellness
  async fetchSessions(start_date?: string, end_date?: string, next_token?: string) {
    return await this.client.getSessions(start_date, end_date, next_token);
  }

  async fetchDailyStress(start_date?: string, end_date?: string, next_token?: string) {
    return await this.client.getDailyStress(start_date, end_date, next_token);
  }

  async fetchTags(start_date?: string, end_date?: string, next_token?: string) {
    return await this.client.getTags(start_date, end_date, next_token);
  }

  async fetchEnhancedTags(start_date?: string, end_date?: string, next_token?: string) {
    return await this.client.getEnhancedTags(start_date, end_date, next_token);
  }

  // Heart Rate
  async fetchHeartRate(start_date?: string, end_date?: string, next_token?: string) {
    return await this.client.getHeartRate(start_date, end_date, next_token);
  }

  // Rest Mode & Configuration
  async fetchRestModePeriods(start_date?: string, end_date?: string, next_token?: string) {
    return await this.client.getRestModePeriods(start_date, end_date, next_token);
  }

  async fetchRingConfiguration(start_date?: string, end_date?: string, next_token?: string) {
    return await this.client.getRingConfiguration(start_date, end_date, next_token);
  }

  // Webhooks
  async fetchWebhookSubscriptions() {
    return await this.client.getWebhookSubscriptions();
  }

  async createWebhookSubscription(
    callback_url: string,
    verification_token: string,
    event_type: "create" | "update" | "delete",
    data_type: string
  ) {
    return await this.client.createWebhookSubscription(
      callback_url,
      verification_token,
      event_type,
      data_type
    );
  }

  async deleteWebhookSubscription(id: string) {
    await this.client.deleteWebhookSubscription(id);
    return { success: true, message: `Webhook subscription ${id} deleted` };
  }
}

// MCP-formatted response helpers (for future MCP server integration)
export async function mcpGetPersonalInfo(config: OuraMCPConfig) {
  const tools = new OuraMCPTools(config);
  const result = await tools.fetchPersonalInfo();
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

export async function mcpGetDailySleep(
  config: OuraMCPConfig,
  start_date?: string,
  end_date?: string,
  next_token?: string
) {
  const tools = new OuraMCPTools(config);
  const result = await tools.fetchDailySleep(start_date, end_date, next_token);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

export async function mcpGetDailyActivity(
  config: OuraMCPConfig,
  start_date?: string,
  end_date?: string,
  next_token?: string
) {
  const tools = new OuraMCPTools(config);
  const result = await tools.fetchDailyActivity(start_date, end_date, next_token);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

export async function mcpGetDailyReadiness(
  config: OuraMCPConfig,
  start_date?: string,
  end_date?: string,
  next_token?: string
) {
  const tools = new OuraMCPTools(config);
  const result = await tools.fetchDailyReadiness(start_date, end_date, next_token);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

// Helper function to get tool description for UI display
export function getOuraToolDescription(toolName: string, params?: any): string {
  const descriptions: Record<string, string> = {
    getPersonalInfo: "Fetching personal information from Oura Ring",
    getDailySleep: "Getting sleep data and scores",
    getSleep: "Retrieving detailed sleep analysis",
    getSleepTime: "Getting bedtime recommendations",
    getDailyReadiness: "Analyzing readiness scores",
    getDailyActivity: "Fetching activity and steps data",
    getWorkouts: "Retrieving workout sessions",
    getSessions: "Getting meditation and breathing sessions",
    getDailyStress: "Analyzing stress levels",
    getTags: "Fetching user tags",
    getEnhancedTags: "Getting enhanced tag data",
    getHeartRate: "Retrieving heart rate measurements",
    getRestModePeriods: "Getting rest mode periods",
    getRingConfiguration: "Fetching ring settings",
    getWebhookSubscriptions: "Listing webhook subscriptions",
    createWebhookSubscription: "Creating new webhook subscription",
    deleteWebhookSubscription: "Deleting webhook subscription",
  };

  let description = descriptions[toolName] || `Executing ${toolName}`;
  
  if (params?.start_date || params?.end_date) {
    const dateRange = [];
    if (params.start_date) dateRange.push(`from ${params.start_date}`);
    if (params.end_date) dateRange.push(`to ${params.end_date}`);
    if (dateRange.length > 0) {
      description += ` (${dateRange.join(" ")})`;
    }
  }

  return description;
}

// Helper function to extract result count from tool responses
export function extractOuraResultCount(result: any): number | null {
  if (!result) return null;
  
  if (result.data && Array.isArray(result.data)) {
    return result.data.length;
  }
  
  if (Array.isArray(result)) {
    return result.length;
  }
  
  return null;
}