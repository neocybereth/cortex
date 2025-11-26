import { tool } from "ai";
import { z } from "zod";

const OURA_API_BASE = "https://api.ouraring.com/v2";

interface OuraCredentials {
  accessToken: string;
}

async function ouraFetch(
  url: string,
  headers: Record<string, string>,
  toolName: string
) {
  console.log(`[Oura Tools] ${toolName} - Fetching:`, url);

  try {
    const response = await fetch(url, { headers });

    console.log(`[Oura Tools] ${toolName} - Response status:`, response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Oura Tools] ${toolName} - API Error:`, {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Oura API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(
      `[Oura Tools] ${toolName} - Success, data keys:`,
      Object.keys(data)
    );
    return data;
  } catch (error) {
    console.error(`[Oura Tools] ${toolName} - Fetch error:`, error);
    throw error;
  }
}

export function createOuraTools(credentials: OuraCredentials) {
  const headers = {
    Authorization: `Bearer ${credentials.accessToken}`,
    "Content-Type": "application/json",
  };

  console.log(
    "[Oura Tools] Creating tools with token length:",
    credentials.accessToken?.length
  );

  return {
    getPersonalInfo: tool({
      description: "Get personal information from Oura Ring",
      inputSchema: z.object({}),
      execute: async ({}) => {
        return await ouraFetch(
          `${OURA_API_BASE}/usercollection/personal_info`,
          headers,
          "getPersonalInfo"
        );
      },
    }),

    getDailySleep: tool({
      description:
        "Get daily sleep data from Oura Ring for a specific date range",
      inputSchema: z.object({
        startDate: z.string().describe("Start date in YYYY-MM-DD format"),
        endDate: z
          .string()
          .optional()
          .describe("End date in YYYY-MM-DD format"),
      }),
      execute: async ({ startDate, endDate }) => {
        const url = new URL(`${OURA_API_BASE}/usercollection/daily_sleep`);
        url.searchParams.append("start_date", startDate);
        if (endDate) url.searchParams.append("end_date", endDate);

        return await ouraFetch(url.toString(), headers, "getDailySleep");
      },
    }),

    getDailyActivity: tool({
      description:
        "Get daily activity data from Oura Ring for a specific date range",
      inputSchema: z.object({
        startDate: z.string().describe("Start date in YYYY-MM-DD format"),
        endDate: z
          .string()
          .optional()
          .describe("End date in YYYY-MM-DD format"),
      }),
      execute: async ({ startDate, endDate }) => {
        const url = new URL(`${OURA_API_BASE}/usercollection/daily_activity`);
        url.searchParams.append("start_date", startDate);
        if (endDate) url.searchParams.append("end_date", endDate);

        return await ouraFetch(url.toString(), headers, "getDailyActivity");
      },
    }),

    getDailyReadiness: tool({
      description:
        "Get daily readiness data from Oura Ring for a specific date range",
      inputSchema: z.object({
        startDate: z.string().describe("Start date in YYYY-MM-DD format"),
        endDate: z
          .string()
          .optional()
          .describe("End date in YYYY-MM-DD format"),
      }),
      execute: async ({ startDate, endDate }) => {
        const url = new URL(`${OURA_API_BASE}/usercollection/daily_readiness`);
        url.searchParams.append("start_date", startDate);
        if (endDate) url.searchParams.append("end_date", endDate);

        return await ouraFetch(url.toString(), headers, "getDailyReadiness");
      },
    }),

    getDailyStress: tool({
      description:
        "Get daily stress data from Oura Ring for a specific date range",
      inputSchema: z.object({
        startDate: z.string().describe("Start date in YYYY-MM-DD format"),
        endDate: z
          .string()
          .optional()
          .describe("End date in YYYY-MM-DD format"),
      }),
      execute: async ({ startDate, endDate }) => {
        const url = new URL(`${OURA_API_BASE}/usercollection/daily_stress`);
        url.searchParams.append("start_date", startDate);
        if (endDate) url.searchParams.append("end_date", endDate);

        return await ouraFetch(url.toString(), headers, "getDailyStress");
      },
    }),

    getWorkouts: tool({
      description: "Get workout data from Oura Ring for a specific date range",
      inputSchema: z.object({
        startDate: z.string().describe("Start date in YYYY-MM-DD format"),
        endDate: z
          .string()
          .optional()
          .describe("End date in YYYY-MM-DD format"),
      }),
      execute: async ({ startDate, endDate }) => {
        const url = new URL(`${OURA_API_BASE}/usercollection/workout`);
        url.searchParams.append("start_date", startDate);
        if (endDate) url.searchParams.append("end_date", endDate);

        return await ouraFetch(url.toString(), headers, "getWorkouts");
      },
    }),

    getHeartRate: tool({
      description:
        "Get heart rate data from Oura Ring for a specific date range",
      inputSchema: z.object({
        startDate: z.string().describe("Start date in YYYY-MM-DD format"),
        endDate: z
          .string()
          .optional()
          .describe("End date in YYYY-MM-DD format"),
      }),
      execute: async ({ startDate, endDate }) => {
        const url = new URL(`${OURA_API_BASE}/usercollection/heartrate`);
        url.searchParams.append("start_date", startDate);
        if (endDate) url.searchParams.append("end_date", endDate);

        return await ouraFetch(url.toString(), headers, "getHeartRate");
      },
    }),

    getSessions: tool({
      description:
        "Get session data (meditation, breathing exercises, etc.) from Oura Ring for a specific date range",
      inputSchema: z.object({
        startDate: z.string().describe("Start date in YYYY-MM-DD format"),
        endDate: z
          .string()
          .optional()
          .describe("End date in YYYY-MM-DD format"),
      }),
      execute: async ({ startDate, endDate }) => {
        const url = new URL(`${OURA_API_BASE}/usercollection/session`);
        url.searchParams.append("start_date", startDate);
        if (endDate) url.searchParams.append("end_date", endDate);

        return await ouraFetch(url.toString(), headers, "getSessions");
      },
    }),

    getSleep: tool({
      description:
        "Get detailed sleep data from Oura Ring (including sleep stages, heart rate during sleep, etc.) for a specific date range",
      inputSchema: z.object({
        startDate: z.string().describe("Start date in YYYY-MM-DD format"),
        endDate: z
          .string()
          .optional()
          .describe("End date in YYYY-MM-DD format"),
      }),
      execute: async ({ startDate, endDate }) => {
        const url = new URL(`${OURA_API_BASE}/usercollection/sleep`);
        url.searchParams.append("start_date", startDate);
        if (endDate) url.searchParams.append("end_date", endDate);

        return await ouraFetch(url.toString(), headers, "getSleep");
      },
    }),

    getSleepTime: tool({
      description:
        "Get optimal bedtime recommendations and sleep timing data from Oura Ring for a specific date range",
      inputSchema: z.object({
        startDate: z.string().describe("Start date in YYYY-MM-DD format"),
        endDate: z
          .string()
          .optional()
          .describe("End date in YYYY-MM-DD format"),
      }),
      execute: async ({ startDate, endDate }) => {
        const url = new URL(`${OURA_API_BASE}/usercollection/sleep_time`);
        url.searchParams.append("start_date", startDate);
        if (endDate) url.searchParams.append("end_date", endDate);

        return await ouraFetch(url.toString(), headers, "getSleepTime");
      },
    }),

    getTags: tool({
      description:
        "Get user-created tags from Oura Ring for a specific date range",
      inputSchema: z.object({
        startDate: z.string().describe("Start date in YYYY-MM-DD format"),
        endDate: z
          .string()
          .optional()
          .describe("End date in YYYY-MM-DD format"),
      }),
      execute: async ({ startDate, endDate }) => {
        const url = new URL(`${OURA_API_BASE}/usercollection/tag`);
        url.searchParams.append("start_date", startDate);
        if (endDate) url.searchParams.append("end_date", endDate);

        return await ouraFetch(url.toString(), headers, "getTags");
      },
    }),

    getEnhancedTags: tool({
      description:
        "Get enhanced tags with additional metadata from Oura Ring for a specific date range",
      inputSchema: z.object({
        startDate: z.string().describe("Start date in YYYY-MM-DD format"),
        endDate: z
          .string()
          .optional()
          .describe("End date in YYYY-MM-DD format"),
      }),
      execute: async ({ startDate, endDate }) => {
        const url = new URL(`${OURA_API_BASE}/usercollection/enhanced_tag`);
        url.searchParams.append("start_date", startDate);
        if (endDate) url.searchParams.append("end_date", endDate);

        return await ouraFetch(url.toString(), headers, "getEnhancedTags");
      },
    }),

    getRestModePeriods: tool({
      description:
        "Get rest mode periods from Oura Ring when rest mode was enabled for a specific date range",
      inputSchema: z.object({
        startDate: z.string().describe("Start date in YYYY-MM-DD format"),
        endDate: z
          .string()
          .optional()
          .describe("End date in YYYY-MM-DD format"),
      }),
      execute: async ({ startDate, endDate }) => {
        const url = new URL(`${OURA_API_BASE}/usercollection/rest_mode_period`);
        url.searchParams.append("start_date", startDate);
        if (endDate) url.searchParams.append("end_date", endDate);

        return await ouraFetch(url.toString(), headers, "getRestModePeriods");
      },
    }),

    getRingConfiguration: tool({
      description:
        "Get Oura Ring device configuration and settings (color, size, firmware version, etc.)",
      inputSchema: z.object({}),
      execute: async ({}) => {
        return await ouraFetch(
          `${OURA_API_BASE}/usercollection/ring_configuration`,
          headers,
          "getRingConfiguration"
        );
      },
    }),
  };
}
