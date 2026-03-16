import { ContactFormData } from "@/schemas/contactValidation";

const CONTACT_WEBHOOK_URL = import.meta.env.VITE_N8N_CONTACT_WEBHOOK_URL;

const normalizePhone = (phone: string) => {
  const cleanPhone = phone.replace(/[\s-]/g, "").trim();
  if (cleanPhone.startsWith("0")) {
    return `+972${cleanPhone.substring(1)}`;
  }
  if (cleanPhone.startsWith("972")) {
    return `+${cleanPhone}`;
  }
  return cleanPhone;
};

const sanitizeText = (value: string, maxLength: number) => value.trim().substring(0, maxLength);

const buildErrorResponse = (body: unknown) => {
  const errors: string[] = [];
  if (typeof body === "object" && body) {
    const typed = body as Record<string, unknown>;
    if (typeof typed.error === "string") {
      errors.push(typed.error);
    }
    if (Array.isArray(typed.details)) {
      errors.push(...typed.details.filter((item): item is string => typeof item === "string"));
    }
  }
  if (errors.length === 0) {
    errors.push("שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.");
  }
  return errors;
};

const defaultFailure = () => ({
  success: false,
  errors: ["שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר."],
});

export class ContactIntegrationService {
  static async submitContactForm(data: ContactFormData): Promise<{ success: boolean; errors: string[] }> {
    if (!CONTACT_WEBHOOK_URL) {
      console.error("Contact webhook URL not configured");
      return defaultFailure();
    }

    const payload = {
      name: sanitizeText(data.name, 100),
      company_name: sanitizeText(data.companyName, 100),
      business_description: sanitizeText(data.businessDescription, 1000),
      email: sanitizeText(data.email || "", 255),
      phone: normalizePhone(data.phone),
      timestamp: new Date().toISOString(),
      source: "website",
    };

    try {
      const response = await fetch(CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const responseBody = await response.json().catch(() => null);
        console.error("Contact webhook responded with error:", response.status, responseBody);
        return { success: false, errors: buildErrorResponse(responseBody) };
      }

      console.log("Contact form submitted successfully");
      return { success: true, errors: [] };
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      return defaultFailure();
    }
  }
}
