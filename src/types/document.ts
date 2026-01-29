export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Document {
    documentId: string;
    originalFileName: string;
    uploadedAt: string;
    thumbnailUrl: string;
    pdfUrl: string;
    tags: string[];
    user: User;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface DocumentResponse {
    status: boolean;
    message: string;
    data: {
        data: Document[];
        meta: Meta;
    };
}