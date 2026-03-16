import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "השם חייב להכיל לפחות 2 תווים")
    .max(50, "השם לא יכול להכיל יותר מ-50 תווים")
    .regex(/^[א-ת\u0590-\u05FF\s\u200F\u200Ea-zA-Z\s]+$/, "השם יכול להכיל רק אותיות בעברית או באנגלית"),

  companyName: z
    .string()
    .min(3, "שם החברה חייב להכיל לפחות 3 תווים")
    .max(100, "שם החברה לא יכול להכיל יותר מ-100 תווים"),

  businessDescription: z
    .string()
    .min(6, "התיאור חייב להכיל לפחות 10 תווים")
    .max(500, "התיאור לא יכול להכיל יותר מ-500 תווים"),

  phone: z
    .string()
    .min(9, "מספר הטלפון קצר מדי")
    .max(11, "מספר הטלפון ארוך מדי")
    .regex(
      /^0[2-9]\d{7,8}$|^\+972[2-9]\d{7,8}$|^972[2-9]\d{7,8}$/,
      "מספר הטלפון לא תקין. יש להזין מספר ישראלי תקין"
    ),

  email: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const validateField = (field: keyof ContactFormData, value: string): string | null => {
  try {
    const fieldSchema = contactFormSchema.shape[field];
    fieldSchema.parse(value);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || "שגיאה בוולידציה";
    }
    return "שגיאה בוולידציה";
  }
};

export const validateStep = (step: number, formData: ContactFormData): { isValid: boolean; error?: string } => {
  switch (step) {
    case 1: {
      const nameError = validateField("name", formData.name);
      return { isValid: !nameError, error: nameError || undefined };
    }
    case 2: {
      const companyError = validateField("companyName", formData.companyName);
      return { isValid: !companyError, error: companyError || undefined };
    }
    case 3: {
      const descriptionError = validateField("businessDescription", formData.businessDescription);
      return { isValid: !descriptionError, error: descriptionError || undefined };
    }
    case 4: {
      const phoneError = validateField("phone", formData.phone);
      return { isValid: !phoneError, error: phoneError || undefined };
    }
    default:
      return { isValid: true };
  }
};
