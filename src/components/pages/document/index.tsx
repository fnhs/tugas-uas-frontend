import { DocumentGrid } from "@/components/organisms/document/document-grid";
import { DocumentTable } from "@/components/organisms/document/document-table";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { getDocuments } from "@/services/document";
import type { Document, DocumentResponse } from "@/types/document";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, PlusIcon, SearchIcon, TableProperties } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useDebounce } from "@/hooks/use-debounce";


const DocumentPage = () => {
    const [viewMode, setViewMode] = useState<"grid" | "table">("table");
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading, refetch } = useQuery<DocumentResponse>({
        queryKey: ['documents', debouncedSearch],
        queryFn: async () => {
            const res: any = await getDocuments(debouncedSearch);
            return res.data;
        }
    });

    const documents: Document[] = data?.data?.data || [];

    return (
        <>
            <h1 className="text-2xl font-bold text-primary">Document</h1>
            <p className="text-muted-foreground">
                Manage your documents here
            </p>
            <div className="flex justify-end gap-2 items-center mt-4">
                <InputGroup className="w-full max-w-xs">
                    <InputGroupInput
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>
                <ButtonGroup>
                    <Button
                        variant={viewMode === "table" ? "secondary" : "outline"}
                        onClick={() => setViewMode("table")}
                        size="icon"
                    >
                        <TableProperties className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === "grid" ? "secondary" : "outline"}
                        onClick={() => setViewMode("grid")}
                        size="icon"
                    >
                        <LayoutGrid className="h-4 w-4" />
                    </Button>
                </ButtonGroup>
                <Link to="/document/form">
                    <Button variant="default">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add Document
                    </Button>
                </Link>
            </div>

            <div className="mt-6">
                {isLoading ? (
                    <div className="text-center py-10">Loading documentation...</div>
                ) : (
                    viewMode === "table" ? (
                        <DocumentTable data={documents || []} onDelete={refetch as any} />
                    ) : (
                        <DocumentGrid data={documents || []} onDelete={refetch as any} />
                    )
                )}
            </div>
        </>
    );
};

export default DocumentPage;