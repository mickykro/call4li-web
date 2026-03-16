export interface OnboardingEvent {
  event: "page_opened" | "button_clicked";
  client_id: string;
  action?: "activate" | "cancel" | "check";
}

const ONBOARDING_WEBHOOK_URL = import.meta.env.VITE_N8N_ONBOARDING_WEBHOOK_URL;

export const logOnboardingEvent = async (eventData: OnboardingEvent): Promise<void> => {
  if (!ONBOARDING_WEBHOOK_URL) {
    console.error("Onboarding webhook URL not configured");
    return;
  }

  try {
    const payload = {
      event: eventData.event,
      client_id: eventData.client_id,
      action: eventData.action,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(ONBOARDING_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const responseText = await response.text().catch(() => "<no body>");
      console.error("Onboarding webhook responded with error:", response.status, responseText);
    }
  } catch (error) {
    console.error("Failed to log onboarding event:", error);
    // Silently fail — don't block user experience
  }
};
