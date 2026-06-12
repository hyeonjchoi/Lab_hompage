# LAB Page Implementation Log

Date: 2026-06-12

## Scope

This log summarizes the current LAB page structure and implementation state for the KW CAP Lab homepage.

## Core Pages

- `lab.html`: Main LAB research page with calendar, notices, shared resources, meeting minutes, and researcher progress overview.
- `lab-member.html`: Individual researcher page with goals, list/calendar views, attended lab meetings, personal notes, and professor feedback.
- `lab-notices.html`: Full notice list page.
- `lab-resources.html`: Full shared resources list page.
- `lab-minutes.html`: Full lab meeting minutes list page.

## Authentication And Navigation

- LAB navigation is available only after a lab member is logged in.
- The top navigation shows `LAB / Members` beside the existing `지원하기 / Join Us` button and uses the same button sizing.
- Logged-in users see a two-row profile area:
  - First row: user name, `내 프로필`, `내 연구페이지`
  - Second row: `관리자` for professors/admin users, plus `로그아웃`
- Non-logged-in users do not see the LAB page button.

## Main LAB Page

- Page title is `LAB 연구 페이지`.
- Calendar, meeting minutes, notices, shared resources, and research progress are organized into dashboard sections.
- Calendar supports event creation and event detail editing.
- Calendar event categories are:
  - 수업
  - 랩미팅
  - 학회 및 모임
- `일정 추가` and `회의록 추가` buttons are positioned inside the calendar panel below the month selector row, aligned with the event legend.
- Top action buttons for `공지 추가`, `공유 자료 추가`, and `진행상황 업데이트` use the same emphasized button style.
- Attendee selection includes an all-select action.
- `학회 및 모임` uses `참고 링크` wording.

## Meeting Minutes

- Main LAB page shows meeting minutes with pagination, five items per page.
- Meeting minutes include a restored expand/collapse detail view.
- Meeting minutes retention notice is shown as helper text under the section title.
- Minutes are retained for 60 days; older records are automatically filtered out/deleted during data cleanup.
- A dedicated `lab-minutes.html` page provides full meeting minutes browsing.

## Notices And Shared Resources

- Notices and shared resources each have full-list subpages.
- Shared resource creation button text uses `공유 자료 추가`.

## Researcher Progress And Admin Mode

- Researcher progress cards link to member research pages.
- Professor/admin mode highlights member cards with a bordered/hover state and allows entry into student research pages.
- Admin users can view student goals and add professor feedback.
- Admin users cannot create, update, delete, or change student goal status.
- Professor feedback displays the professor name with the feedback entry.

## Individual Research Goals

- Goals support:
  - Title
  - Status
  - Start date
  - End date
  - Category
  - Memo
- `목표 추가` toggles the goal input form open and closed.
- List view shows five goals per page.
- List view displays status as centered badges and no longer prefixes goal titles with a symbol.
- Calendar view shows goals as colored bars based on status.
- Calendar bars reflect the start/end date period.
- Users can drag a calendar bar to move the goal period.
- Users can resize the goal period from the calendar bar handles.
- Clicking a calendar goal opens the lower edit form for detailed changes.

## Reservation Page Text

- The lab reservation guideline wording now says `학과 조교에게 별도 요청`.

## Data Storage

- Current LAB data is stored client-side in `localStorage` under the LAB data key.
- Data structures include events, minutes, progress, member notes, and member goals.
