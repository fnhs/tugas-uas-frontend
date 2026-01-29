import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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

interface DocumentTableProps {
    data: Document[] | null;
    onDelete?: () => void;
}

export const DocumentTable = ({ data, onDelete }: DocumentTableProps) => {

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

    console.log("data", data);
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>File name</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Shared With</TableHead>
                        <TableHead>Modified Date</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data && data.map((doc) => (
                            <TableRow key={doc.documentId}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                                            <FileText size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm">{doc.originalFileName}</span>
                                            <span className="text-xs text-muted-foreground">Uploaded on {format(new Date(doc.uploadedAt), "d MMM yyyy")}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {doc.tags?.slice(0, 3).map((tag, i) => (
                                            <Badge key={i} variant="secondary" className="rounded-sm font-normal text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                        {doc.tags?.length > 3 && (
                                            <Badge variant="secondary" className="rounded-sm font-normal text-xs">
                                                +{doc.tags.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex -space-x-2">
                                        <Avatar className="h-8 w-8 border-2 border-background">
                                            <AvatarImage src={`https://ui-avatars.com/api/?name=${doc.user.name}`} />
                                            <AvatarFallback>{doc.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm text-muted-foreground">{format(new Date(doc.uploadedAt), "MMM d, yyyy")}</span>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
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
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
