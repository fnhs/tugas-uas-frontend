import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getDocumentById } from "@/services/document";
import type { Document as DocType } from "@/types/document";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate, useParams } from "react-router";
import { format } from "date-fns";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const DocumentViewPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const { data: document, isLoading } = useQuery<DocType>({
        queryKey: ["document", id],
        queryFn: async () => {
            const res: any = await getDocumentById(id!);
            return res.data.data;
        },
        enabled: !!id,
    });

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Loading document...</div>;
    }

    if (!document) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
                <p className="text-muted-foreground">Document not found</p>
                <Button onClick={() => navigate("/")} variant="outline">
                    Back to Documents
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1 space-y-1">
                    <h1 className="text-2xl font-bold text-primary">{document.originalFileName}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Uploaded {format(new Date(document.uploadedAt), "MMM d, yyyy")}</span>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            <span>by {document.user.name}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {document.tags?.map((tag, i) => (
                        <Badge key={i} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/20 p-8">
                <Document
                    file={document.pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="overflow-hidden rounded-md border bg-white shadow-sm"
                    loading={<div className="p-10 text-center text-sm text-muted-foreground">Loading PDF...</div>}
                    error={<div className="p-10 text-center text-sm text-destructive">Failed to load PDF.</div>}
                >
                    <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} width={800} />
                </Document>

                {numPages && (
                    <div className="flex items-center gap-4 mt-6">
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={pageNumber <= 1}
                            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <p className="text-sm">
                            Page {pageNumber} of {numPages}
                        </p>
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={pageNumber >= numPages}
                            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentViewPage;
