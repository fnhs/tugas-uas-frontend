import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileText } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Document } from "@/types/document";
import { format } from "date-fns";

import { deleteDocument } from "@/services/document";
import { toast } from "sonner";

interface DocumentGridProps {
    data: Document[];
    onDelete?: () => void;
}

export const DocumentGrid = ({ data, onDelete }: DocumentGridProps) => {

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this document?")) {
            try {
                const res: any = await deleteDocument(id);
                if (res.status) {
                    toast.success("Document deleted");
                    onDelete?.();
                } else {
                    toast.error(res.message || "Delete failed");
                }
            } catch (error: any) {
                toast.error(error.message || "Error deleting document");
            }
        }
    }

    if (data.length === 0) {
        return (
            <div className="col-span-full rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                No documents found.
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((doc) => (
                <Card key={doc.documentId} className="overflow-hidden">
                    <div className="aspect-video w-full bg-muted flex items-center justify-center relative group">
                        {doc.thumbnailUrl ? (
                            <img src={doc.thumbnailUrl} alt={doc.originalFileName} className="h-full w-full object-cover" />
                        ) : (
                            <FileText className="h-12 w-12 text-muted-foreground" />
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="secondary" size="sm" onClick={() => window.location.href = `/document/${doc.documentId}`}>Preview</Button>
                        </div>
                    </div>

                    <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <h3 className="font-semibold text-sm line-clamp-1" title={doc.originalFileName}>{doc.originalFileName}</h3>
                                <p className="text-xs text-muted-foreground">{format(new Date(doc.uploadedAt), "MMM d, yyyy")}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => window.location.href = `/document/${doc.documentId}`}>
                                        View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => window.location.href = `/document/edit/${doc.documentId}`}>
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(doc.documentId)}>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                            {doc.tags?.slice(0, 2).map((tag, i) => (
                                <Badge key={i} variant="secondary" className="rounded-sm font-normal text-[10px] px-1.5 h-5">
                                    {tag}
                                </Badge>
                            ))}
                            {doc.tags?.length > 2 && (
                                <Badge variant="secondary" className="rounded-sm font-normal text-[10px] px-1.5 h-5">
                                    +{doc.tags.length - 2}
                                </Badge>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Avatar className="h-5 w-5">
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${doc.user.name}`} />
                                <AvatarFallback>{doc.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="truncate max-w-[100px]">{doc.user.name}</span>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};
