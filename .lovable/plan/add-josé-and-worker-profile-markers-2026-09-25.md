# Add José and worker profile markers

## Changes
- Add José as a waste collector and place him first whenever the Collector filter is active.
- Use the attached street-cleaning photo as José’s profile picture.
- Add role-appropriate profile images for the other worker types and show them in the worker list and profile details.
- Replace the map’s colored dots with compact circular profile-photo markers while retaining selected, active, and off-duty visual states.

## Technical details
- Extend the worker data with a profile image reference and ensure sorting keeps José first in the collector view.
- Store the uploaded photo through the project asset flow and add a small cohesive set of generated role portraits for the remaining roles.
- Keep map selection, route highlighting, search, filters, and status controls unchanged.
- Verify the dashboard visually at desktop and mobile widths and confirm the current build remains clean.
