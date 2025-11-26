# Oura Ring API Integration

A comprehensive Oura Ring health and fitness data integration for Cortex, built with clean architecture and type safety.

## Features

This integration provides access to all major Oura Ring data types through AI-powered tools:

### Health & Fitness Data

* **Personal Info** - User profile information (age, weight, height, biological sex, email)
* **Sleep Data** - Detailed sleep data with sleep stages and contributors
* **Daily Sleep** - Daily sleep summaries with scores
* **Activity Data** - Steps, calories, activity levels, MET minutes
* **Daily Activity** - Daily activity summaries with scores
* **Readiness Data** - Daily readiness scores and contributing factors
* **Heart Rate** - Heart rate measurements with timestamps and sources

### Daily Summaries

* **Daily Sleep** - Sleep summaries with scores and contributors
* **Daily Readiness** - Readiness summaries with temperature data
* **Daily Activity** - Activity summaries with scores and metrics
* **Daily Stress** - Stress levels and recovery metrics

### Sessions & Workouts

* **Workouts** - Exercise sessions with activity type, duration, calories, distance
* **Sessions** - Breathing exercises, meditation, naps, relaxation sessions
* **Tags** - User-created tags for tracking activities and symptoms
* **Enhanced Tags** - Enhanced tags with additional metadata

### Time & Configuration

* **Sleep Time** - Bedtime and wake time recommendations
* **Rest Mode Periods** - Rest mode periods when enabled
* **Ring Configuration** - Ring settings, color, design, firmware version, size

### Webhooks (Advanced)

* **Webhook Management** - Create, list, and delete webhook subscriptions for real-time data updates

## Architecture

### Clean Separation of Concerns

```
src/lib/
├── types.ts           # TypeScript types and Zod schemas
├── oura-client.ts     # Oura API client implementation
└── oura-tools.ts      # AI tools using the client
```

### Type Safety

- Full TypeScript types for all API responses
- Zod schemas for runtime validation
- Proper error handling throughout

### Client-First Design

The `OuraClient` class provides a clean, testable interface to the Oura API:

```typescript
const client = new OuraClient({
  accessToken: process.env.OURA_ACCESS_TOKEN!,
  clientId: process.env.OURA_CLIENT_ID,      // Optional for webhooks
  clientSecret: process.env.OURA_CLIENT_SECRET // Optional for webhooks
});

// Use the client directly
const personalInfo = await client.getPersonalInfo();
const sleepData = await client.getDailySleep('2025-11-20', '2025-11-26');
```

## Configuration

### Environment Variables

Required:
```bash
OURA_ACCESS_TOKEN=your_personal_access_token_here
```

Optional (for webhook functionality):
```bash
OURA_CLIENT_ID=your_client_id_here
OURA_CLIENT_SECRET=your_client_secret_here
```

### Getting Your Access Token

1. Go to [Oura Cloud Personal Access Tokens](https://cloud.ouraring.com/personal-access-tokens)
2. Click "Create New Personal Access Token"
3. Copy the generated token
4. Add it to your `.env.local` file

### For Webhook Functionality (Optional)

If you want real-time data updates via webhooks:

1. Register an API Application at [Oura Cloud OAuth Applications](https://cloud.ouraring.com/oauth/applications)
2. Add your `OURA_CLIENT_ID` and `OURA_CLIENT_SECRET` to `.env.local`

## Available AI Tools

### Personal Information

* `getPersonalInfo` - Get user personal information

### Sleep & Readiness

* `getSleep` - Get detailed sleep data with sleep stages
* `getDailySleep` - Get daily sleep summaries
* `getSleepTime` - Get bedtime and wake time recommendations
* `getDailyReadiness` - Get daily readiness summaries

### Activity & Exercise

* `getDailyActivity` - Get daily activity summaries
* `getWorkouts` - Get workout sessions
* `getHeartRate` - Get heart rate measurements

### Sessions & Wellness

* `getSessions` - Get breathing, meditation, and nap sessions
* `getDailyStress` - Get daily stress and recovery data
* `getTags` - Get user-created tags
* `getEnhancedTags` - Get enhanced tags with metadata

### Configuration

* `getRestModePeriods` - Get rest mode periods
* `getRingConfiguration` - Get ring settings

### Webhooks (Advanced)

* `getWebhookSubscriptions` - List active webhook subscriptions
* `createWebhookSubscription` - Create new webhook subscription
* `deleteWebhookSubscription` - Delete webhook subscription

## Date Range Parameters

Most tools accept optional date range parameters:

* `start_date` - Start date in YYYY-MM-DD format
* `end_date` - End date in YYYY-MM-DD format  
* `next_token` - Pagination token for large datasets

Example usage:
```typescript
const sleepData = await client.getDailySleep('2025-11-20', '2025-11-26');
```

## API Reference

### Authentication

- Uses Bearer token authentication with Personal Access Tokens
- Webhook operations require OAuth2 application credentials

### Rate Limits

- 5000 requests per 5-minute period
- Webhooks are recommended to minimize API calls

### Error Handling

- Comprehensive error handling for API errors
- Network issue detection
- Invalid response validation
- Detailed error messages with status codes

## Webhooks

Webhooks provide real-time notifications when your Oura data changes.

### Webhook Data Types

* `tag` - User tags
* `enhanced_tag` - Enhanced tags with metadata
* `workout` - Exercise sessions
* `session` - Breathing, meditation, nap sessions
* `sleep` - Sleep data
* `daily_sleep` - Daily sleep summaries
* `daily_readiness` - Daily readiness summaries
* `daily_activity` - Daily activity summaries
* `daily_stress` - Daily stress data

### Event Types

* `create` - New data created
* `update` - Existing data updated
* `delete` - Data deleted

## Example Usage

### In the AI Chat

Ask natural questions like:

- "What was my sleep score last night?"
- "How many steps did I take this week?"
- "Show me my readiness for the past 7 days"
- "What was my heart rate during my last workout?"
- "Show me my stress levels this month"

The AI will automatically:
1. Calculate the appropriate dates based on today's date (2025-11-26)
2. Call the relevant Oura tools
3. Present the data in a helpful, conversational way

### In Code

```typescript
import { createOuraTools } from '@/lib/oura-tools';

const tools = createOuraTools({
  accessToken: process.env.OURA_ACCESS_TOKEN!,
});

// Tools are now available for the AI to use
const result = await streamText({
  model: openai('gpt-4o'),
  messages: convertToModelMessages(messages),
  tools,
});
```

## Links

* [Oura Ring](https://ouraring.com)
* [Oura API Documentation](https://cloud.ouraring.com/docs)
* [Personal Access Tokens](https://cloud.ouraring.com/personal-access-tokens)
* [OAuth Applications](https://cloud.ouraring.com/oauth/applications)

## License

MIT License

