const { google } = require("googleapis"); // Add Google APIs
const calendar = google.calendar("v3"); // Initialize Calendar API

// Function to add event to Google Calendar
async function addToGoogleCalendar(interviewDate, companyName) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "path/to/your/credentials.json",
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendarClient = await auth.getClient();
  google.options({ auth: calendarClient });

  const event = {
    summary: `Interview with ${companyName}`,
    start: {
      dateTime: new Date(interviewDate).toISOString(),
      timeZone: "America/New_York", // Adjust to your timezone
    },
    end: {
      dateTime: new Date(
        new Date(interviewDate).getTime() + 60 * 60 * 1000,
      ).toISOString(), // 1 hour duration
      timeZone: "America/New_York",
    },
  };

  await calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
}

module.exports = addToGoogleCalendar;
