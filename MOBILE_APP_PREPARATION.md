# Mobile App Preparation Plan

Date: 2026-06-12

## Goal

Prepare the current KW CAP Lab homepage and LAB research page features for a mobile app implementation.

The current site is a static HTML/CSS/JavaScript website using browser storage. The mobile app should preserve the existing LAB workflows while moving authentication, data persistence, and notifications into an app-ready architecture.

## Recommended App Direction

Use a cross-platform app stack:

- React Native with Expo for iOS and Android.
- TypeScript for app code.
- Native calendar/list UI instead of directly embedding the current HTML pages.
- A shared backend or hosted database for LAB data sync.

This is the most practical path because the current LAB page has many interactive workflows that should work naturally on phones: calendar editing, goal updates, meeting minutes, notices, resources, and professor feedback.

## Current Web Features To Port

### Public Website

- Home
- People
- Research
- Publications
- Reservation
- Join
- Login

These can be implemented as app tabs or read-only content screens.

### LAB Research Page

- Main LAB dashboard
- Monthly research calendar
- Event detail modal
- Event creation and editing
- Notices
- Shared resources
- Lab meeting minutes
- Researcher progress cards
- Admin mode for professors
- Individual researcher pages
- Goal list view
- Goal calendar view
- Professor feedback
- Attended lab meeting list

## Mobile Navigation Structure

Recommended bottom tabs:

- 홈
- 연구실
- 일정
- 내 연구
- 더보기

Recommended role-based behavior:

- Logged-out users: public tabs only.
- Logged-in lab members: LAB and personal research tabs enabled.
- Professor/admin users: admin actions visible inside LAB and member pages.

## Screens

### Public Screens

- `HomeScreen`
- `PeopleScreen`
- `ResearchScreen`
- `PublicationsScreen`
- `ReservationScreen`
- `JoinScreen`
- `LoginScreen`

### LAB Screens

- `LabDashboardScreen`
- `LabCalendarScreen`
- `LabEventDetailScreen`
- `LabEventFormScreen`
- `NoticeListScreen`
- `ResourceListScreen`
- `MeetingMinutesListScreen`
- `MeetingMinutesDetailScreen`
- `ResearcherProgressScreen`
- `MemberResearchScreen`
- `GoalFormScreen`
- `ProfessorFeedbackScreen`

## Data Model

The current browser data should be converted into app data models.

### Member

- `id`
- `name`
- `studentId`
- `role`
- `group`
- `profile`
- `avatar`

### Session

- `userId`
- `name`
- `role`
- auth token when backend is added

### LabEvent

- `id`
- `type`: `class`, `meeting`, `conference`
- `title`
- `date`
- `startTime`
- `endTime`
- `location`
- `referenceLink`
- `attendees`
- `memo`
- `createdAt`
- `updatedAt`

### MeetingMinutes

- `id`
- `eventId`
- `meetingDate`
- `title`
- `summary`
- `authorId`
- `createdAt`
- Retention rule: delete or hide after 60 days.

### Notice

- `id`
- `title`
- `body`
- `isImportant`
- `createdAt`
- `updatedAt`

### Resource

- `id`
- `title`
- `url`
- `description`
- `createdAt`
- `updatedAt`

### MemberGoal

- `id`
- `memberId`
- `title`
- `status`: `todo`, `doing`, `done`, `hold`
- `startDate`
- `endDate`
- `targetDate`
- `category`
- `memo`
- `authorId`
- `createdAt`
- `updatedAt`

### MemberNote

- `id`
- `memberId`
- `type`: `memo`, `feedback`
- `text`
- `authorId`
- `authorName`
- `createdAt`

### NotificationSubscription

- `id`
- `userId`
- `deviceId`
- `platform`: `ios`, `android`, `web`
- `pushSubscription`
- `enabled`
- `eventReminderEnabled`
- `goalReminderEnabled`
- `feedbackEnabled`
- `noticeEnabled`
- `importantNoticeEnabled`
- `createdAt`
- `updatedAt`

### NotificationLog

- `id`
- `userId`
- `type`: `event`, `goal`, `feedback`, `notice`, `important_notice`
- `sourceId`
- `title`
- `body`
- `sentAt`
- `readAt`

## Storage Migration

Current web storage keys:

- `cap_session`
- `cap_members`
- `cap_content`
- `cap_lab_data`

Mobile app storage should not rely on browser `localStorage`.

Recommended staged migration:

1. Create a data service layer in the web code that wraps current `localStorage` access.
2. Mirror the same interface in the mobile app.
3. Start with local app storage for prototype builds.
4. Move to a hosted backend for real multi-user sync.

Recommended backend options:

- Supabase: easiest path for auth, database, row-level permissions, and file storage.
- Firebase: strong mobile support and realtime sync.
- Lightweight custom API: best if full control is required later.

## Permissions

### Student/member

- View LAB dashboard.
- View and edit own goals.
- View own attended meetings.
- Add personal notes.
- View professor feedback.

### Professor/admin

- View all member research pages.
- Add professor feedback.
- Create and edit LAB events.
- Create notices, resources, and meeting minutes.
- Cannot edit student goals directly.

## Mobile UX Notes

### Calendar

- Use a native calendar/list hybrid.
- On small screens, default to agenda list below the calendar.
- Event creation should use a full-screen form rather than a side drawer.
- Goal period editing should use date pickers instead of desktop resize handles.

### Goals

- Use segmented controls for `리스트보기` and `일정보기`.
- Status should be displayed as colored badges.
- Editing should happen in a bottom sheet or full-screen form.

### Meeting Minutes

- Show five recent records on dashboard.
- Full list screen supports pagination or infinite scroll.
- Display retention helper text: `회의록은 60일 동안 저장됩니다.`

### Admin Mode

- Admin controls should be visually separated from member controls.
- Member cards should behave as entry links when admin mode is active.

## Implementation Phases

### Phase 1: App Foundation

- Create Expo React Native project.
- Add TypeScript.
- Add navigation.
- Add theme tokens matching the current website.
- Define shared data types.

### Phase 2: Read-Only Screens

- Port public content screens.
- Port LAB dashboard read-only view.
- Port member research page read-only view.

### Phase 3: Local Prototype Data

- Seed members and LAB data.
- Implement local app storage.
- Implement login session.
- Implement role-based navigation.

### Phase 4: Interactive LAB Features

- Event add/edit.
- Meeting minutes add/list/detail.
- Notice/resource list and creation.
- Goal add/edit/delete.
- Goal calendar/list switching.
- Professor feedback.

### Phase 5: Backend Sync

- Choose backend.
- Replace local app storage with API calls.
- Add auth.
- Add admin/student permissions.
- Add 60-day minutes cleanup.
- Add server-side push notification delivery for feedback, meetings, goal deadlines, and notices.
- Add immediate push notifications for important notices.

### Phase 6: Release Prep

- App icon and splash screen.
- Mobile QA checklist.
- TestFlight/internal Android testing.
- Store metadata and privacy policy.

## Immediate Next Tasks

- Decide app stack: Expo React Native is recommended.
- Decide backend: Supabase is recommended for this project.
- Extract shared constants from the website:
  - member roles
  - event types
  - goal statuses
  - date formatting rules
- Create an `/app` or `/mobile` directory for the Expo project.
- Convert current LAB data assumptions into typed interfaces.
- When starting Supabase integration, include push notification tables, notification logs, and server/Edge Function delivery in the first backend scope.

## Open Decisions

- Should the mobile app be login-only, or include public homepage content too?
- Should data sync across devices immediately, or is a local prototype acceptable first?
- Should professor/admin functions be available in the first mobile release?
- Should push notifications be added for upcoming lab meetings, goal deadlines, professor feedback, and notices?
- Should `중요` notices always push immediately to all members, or should professors choose recipient groups?

## Push Notification Requirements

The current web implementation has local PWA reminders, but real multi-user mobile notifications require backend support. When Supabase is implemented, this must be treated as a separate required workstream, not a small UI-only change.

Required notification triggers:

- Upcoming meeting or lab event reminders.
- Meeting or lab event creation/update notifications for attendees.
- Professor feedback added to a member page.
- Goal deadline reminders before the end date.
- New notice notifications.
- Immediate notifications for new `중요` notices.

Expected behavior:

- If a professor or another authorized user adds feedback to a student page, the student should receive a push notification on their phone immediately.
- If an important notice is posted, target members should receive a push notification immediately.
- Notification delivery should be based on Supabase data changes and stored push subscriptions, not on each device's local storage.
- Notification logs should prevent duplicate sends and allow read/handled status tracking later.
