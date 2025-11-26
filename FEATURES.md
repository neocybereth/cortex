# Cortex - Oura Ring AI Assistant Features

## 🎉 What's New

### Enhanced Oura API Integration

Based on the [oura-ring-mcp](https://github.com/JamesLouie/oura-ring-mcp) reference implementation, Cortex now includes:

#### 📊 Complete Data Types

1. **Personal Information** - User profile and settings
2. **Sleep Data** - Comprehensive sleep tracking
   - Daily sleep summaries
   - Detailed sleep analysis (stages, heart rate during sleep)
   - Optimal bedtime recommendations
3. **Activity Data** - Movement and exercise tracking
   - Daily activity summaries
   - Step counts, calories burned
   - MET minutes and activity levels
4. **Readiness Data** - Recovery and preparedness scores
5. **Heart Rate** - Continuous heart rate monitoring
6. **Workouts** - Exercise sessions with detailed metrics
7. **Sessions** - Meditation, breathing exercises, and relaxation
8. **Stress Data** - Daily stress and recovery metrics
9. **Tags** - User-created tags and enhanced tags
10. **Sleep Time** - Bedtime and wake time recommendations
11. **Rest Mode** - Rest mode periods tracking
12. **Ring Configuration** - Device settings and info

### 🛠️ Available AI Tools

The AI assistant can now access these tools:

- `getPersonalInfo` - Get user profile information
- `getDailySleep` - Get daily sleep summaries
- `getSleep` - Get detailed sleep data with stages
- `getSleepTime` - Get optimal bedtime recommendations
- `getDailyActivity` - Get daily activity summaries
- `getDailyReadiness` - Get readiness scores
- `getDailyStress` - Get stress and recovery data
- `getWorkouts` - Get workout sessions
- `getHeartRate` - Get heart rate measurements
- `getSessions` - Get meditation and breathing sessions
- `getTags` - Get user-created tags
- `getEnhancedTags` - Get enhanced tags with metadata
- `getRestModePeriods` - Get rest mode periods
- `getRingConfiguration` - Get ring device configuration

### 🎨 Beautiful Modern UI

#### Dashboard Features
- **Welcome Card** - Gradient hero section with introduction
- **Quick Questions** - One-click sample prompts to get started
- **Metrics Overview** - Visual cards showing available data types
- **Toggle Dashboard** - Show/hide dashboard as needed

#### Enhanced Chat Interface
- **Modern Design** - Gradient backgrounds and smooth transitions
- **Tool Call Badges** - Visual indicators showing which tools are being used
- **Smart Loading States** - Animated loading indicators
- **Error Handling** - Beautiful error displays
- **Message Bubbles** - Distinct styling for user vs. AI messages
- **Responsive Layout** - Works great on all screen sizes

#### Visual Enhancements
- Icon-based tool identification (😴 for sleep, 🏃 for activity, etc.)
- Color-coded categories for different data types
- Smooth animations and transitions
- Shadow effects and hover states
- Gradient accents throughout

### 🔧 Technical Improvements

#### Type Safety
- Comprehensive TypeScript interfaces for all Oura API responses
- Proper typing for sleep stages, contributors, and metrics
- Optional fields marked appropriately

#### Code Organization
- Separate components for metric cards and tool displays
- Reusable helper functions
- Clean separation of concerns

## 💡 Usage Examples

### Quick Questions

**Sleep Analysis:**
- "How did I sleep last night?"
- "Show me my sleep data for the past week"
- "What's my average sleep score this month?"
- "When should I go to bed tonight?"

**Activity Tracking:**
- "Show my activity for this week"
- "How many steps did I take yesterday?"
- "What were my workouts this week?"

**Readiness & Recovery:**
- "What's my readiness score today?"
- "Show me my recovery trends"
- "Am I ready for a hard workout?"

**Heart Rate:**
- "Show my heart rate data from yesterday"
- "What was my resting heart rate last night?"

**Stress & Wellness:**
- "How stressed have I been this week?"
- "Show me my meditation sessions"

**Device Info:**
- "What's my ring configuration?"
- "Show my device settings"

## 🚀 Getting Started

1. Make sure your `OURA_ACCESS_TOKEN` is set in your `.env` file
2. Start the development server: `npm run dev` or `yarn dev`
3. Open your browser to the local development URL
4. Try one of the quick questions or ask your own!

## 🎯 Features at a Glance

- ✅ 14+ AI tools for comprehensive data access
- ✅ Beautiful gradient UI with modern design
- ✅ Smart tool call visualization
- ✅ Quick action prompts
- ✅ Responsive layout
- ✅ Real-time data streaming
- ✅ Error handling and loading states
- ✅ Type-safe implementation
- ✅ Based on official Oura API v2

## 📚 Learn More

- [Oura API Documentation](https://cloud.ouraring.com/docs/)
- [Reference MCP Implementation](https://github.com/JamesLouie/oura-ring-mcp)
- [AI SDK Documentation](https://sdk.vercel.ai/docs)

---

Built with ❤️ using Next.js, TypeScript, and the Oura API v2

