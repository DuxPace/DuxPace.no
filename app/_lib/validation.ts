import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters")
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function validateContactForm(data: FormData): {
  success: boolean;
  data?: ContactFormData;
  errors?: Record<string, string>;
} {
  const formData = {
    name: data.get("name"),
    email: data.get("email"),
    message: data.get("message"),
  };

  const result = contactFormSchema.safeParse(formData);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue: z.ZodIssue) => {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    });
    return { success: false, errors };
  }

  return { success: true, data: result.data };
}
