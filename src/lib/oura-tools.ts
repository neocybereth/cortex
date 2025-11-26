import { tool } from "ai";
import { z } from "zod";

const OURA_API_BASE = "https://api.ouraring.com/v2";

interface OuraCredentials {
  accessToken: string;
}

export function createOuraTools(credentials: OuraCredentials) {
  const headers = {
    Authorization: `Bearer ${credentials.accessToken}`,
    "Content-Type": "application/json",
  };

  return {
    getPersonalInfo: tool({
      description: "Get personal information from Oura Ring",
      inputSchema: z.object({}),
      execute: async ({}) => {
        const response = await fetch(
          `${OURA_API_BASE}/usercollection/personal_info`,
          {
            headers,
          }
        );
        return await response.json();
      },
    }),

    getDailySleep: tool({
      description: "Get daily sleep data from Oura Ring",
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

        const response = await fetch(url.toString(), { headers });
        return await response.json();
      },
    }),

    getDailyActivity: tool({
      description: "Get daily activity data from Oura Ring",
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

        const response = await fetch(url.toString(), { headers });
        return await response.json();
      },
    }),

    getDailyReadiness: tool({
      description: "Get daily readiness data from Oura Ring",
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

        const response = await fetch(url.toString(), { headers });
        return await response.json();
      },
    }),

    getDailyStress: tool({
      description: "Get daily stress data from Oura Ring",
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

        const response = await fetch(url.toString(), { headers });
        return await response.json();
      },
    }),

    getWorkouts: tool({
      description: "Get workout data from Oura Ring",
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

        const response = await fetch(url.toString(), { headers });
        return await response.json();
      },
    }),

    getHeartRate: tool({
      description: "Get heart rate data from Oura Ring",
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

        const response = await fetch(url.toString(), { headers });
        return await response.json();
      },
    }),

    getSessions: tool({
      description: "Get session data from Oura Ring",
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

        const response = await fetch(url.toString(), { headers });
        return await response.json();
      },
    }),
  };
}
