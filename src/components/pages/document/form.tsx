import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FieldGroup, Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { documentUploadSchema, documentUpdateSchema, type DocumentUploadSchema, type DocumentUpdateSchema } from '@/lib/validators/document';
import { uploadDocument, getDocumentById, updateDocument } from '@/services/document';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { useEffect } from 'react';

const DocumentFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<DocumentUploadSchema | DocumentUpdateSchema>({
        resolver: zodResolver(isEditMode ? documentUpdateSchema : documentUploadSchema),
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchDocument = async () => {
                try {
                    const response: any = await getDocumentById(id!);
                    if (response.code === 200) {
                        const doc = response.data.data;
                        setValue("name", doc.originalFileName);
                        setValue("tags", doc.tags?.join(", ") || "");
                    } else {
                        toast.error("Failed to load document");
                        navigate("/");
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Error loading document");
                }
            };
            fetchDocument();
        }
    }, [id, isEditMode, setValue, navigate]);

    const onSubmit = async (data: any) => {
        try {
            let response: any;
            if (isEditMode) {
                response = await updateDocument(id!, {
                    name: data.name,
                    tags: data.tags,
                    file: data.file?.[0], // Optional for update
                });
            } else {
                response = await uploadDocument({
                    name: data.name,
                    tags: data.tags,
                    file: data.file[0],
                });
            }

            if (response.code === 201 || response.code === 200) {
                toast.success(isEditMode ? "Document updated successfully" : "Document uploaded successfully");
                navigate("/");
            } else {
                toast.error(response.message || "Operation failed");
            }
        } catch (error) {
            toast.error("An error occurred");
            console.error(error);
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Upload className="size-5" />
                Upload Document
            </h1>
            <p className="text-muted-foreground">Upload a new PDF document to the system.</p>
            <Card className='mt-6'>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="file">File (PDF)</FieldLabel>
                                <Input
                                    id="file"
                                    type="file"
                                    accept="application/pdf"
                                    {...register("file")}
                                />
                                {errors.file && (
                                    <p className="text-destructive text-sm font-medium">{errors.file.message as string}</p>
                                )}
                                <FieldDescription>Max size 5MB. PDF only.</FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="name">Document Name</FieldLabel>
                                <Input
                                    id="name"
                                    placeholder="Enter document title"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-destructive text-sm font-medium">{errors.name.message}</p>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="tags">Tags</FieldLabel>
                                <Input
                                    id="tags"
                                    placeholder="Comma, separated, tags"
                                    {...register("tags")}
                                />
                                {errors.tags && (
                                    <p className="text-destructive text-sm font-medium">{errors.tags.message}</p>
                                )}
                                <FieldDescription>Optional. Separate tags with commas.</FieldDescription>
                            </Field>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => navigate("/")}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">Upload Document</Button>
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

export default DocumentFormPage;