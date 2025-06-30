import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
//  Button Validation
const buttonSchema = z
  .object({
    type: z.enum(["URL", "CALL"]),
    text: z.string().min(1),
    value: z.any(),
  })
  .superRefine((btn, ctx) => {
    if (btn.type === "URL") {
      if (
        !btn.value?.url ||
        !z.string().url().safeParse(btn.value.url).success
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["value", "url"],
          message: "Valid URL is required for URL-type button",
        });
      }
    } else {
      const phone = parsePhoneNumberFromString(btn.value?.phone_number);
      console.log({ phone });

      if (
        !btn?.value?.phone_number ||
        !phone.isPossible() | !phone?.isValid()
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["value", "phone_number"],
          message: "Phone number is invalid",
        });
      }
    }
  });

// Component Validation
const componentSchema = z
  .object({
    type: z.enum(["HEADER", "BODY", "FOOTER", "BUTTONS"]),
    format: z.string().optional(),
    value: z.any().optional(),
    text: z.string().optional(),
    buttons: z.array(buttonSchema).optional(),
  })
  .superRefine((comp, ctx) => {
    if (comp.type === "HEADER") {
      if (comp.format === "IMAGE") {
        if (
          !comp.value?.url ||
          !z.string().url().safeParse(comp.value.url).success
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["value", "url"],
            message: "HEADER IMAGE requires a valid value.url",
          });
        }
      } else if (comp.format === "TEXT") {
        if (!comp.value?.text || typeof comp.value.text !== "string") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["value", "text"],
            message: "HEADER TEXT requires value.text",
          });
        }
      }
    } else if (comp.type === "BODY") {
      if (!comp.text || comp.text.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["text"],
          message: "BODY component requires text",
        });
      }
    } else if (comp.type === "BUTTONS") {
      if (!Array.isArray(comp.buttons) || comp.buttons.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["buttons"],
          message: "BUTTONS component requires a non-empty buttons array",
        });
      }
    }
  });

// 📄 Main Template Schema
export const templateValidation = z.object({
  language: z.enum(["en_US", "ar_SA"]),
  name: z.string().min(1),
  category: z.enum(["MARKETING", "UTILITY"]),
  components: z.array(componentSchema).min(1),
});

export default templateValidation;
