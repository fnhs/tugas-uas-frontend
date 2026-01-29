import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const documentUploadSchema = z.object({
    name: z.string().min(1, "Name is required"),
    tags: z.string().optional(),
    file: z
        .instanceof(FileList)
        .refine((files) => files?.length === 1, "File is required")
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            `Max file size is 5MB.`
        )
        .refine(
            (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
            "Only .pdf files are accepted."
        ),
});

export type DocumentUploadSchema = z.infer<typeof documentUploadSchema>;

export const documentUpdateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    tags: z.string().optional(),
    file: z
        .instanceof(FileList)
        .optional()
        .refine(
            (files) => !files?.length || files[0].size <= MAX_FILE_SIZE,
            `Max file size is 5MB.`
        )
        .refine(
            (files) => !files?.length || ACCEPTED_FILE_TYPES.includes(files[0].type),
            "Only .pdf files are accepted."
        ),
});

export type DocumentUpdateSchema = z.infer<typeof documentUpdateSchema>;
