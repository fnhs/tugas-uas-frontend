import { callAPIWhiteToken } from "@/config/api";
import { BASE_API } from "@/config/constant";

export interface UploadDocumentParams {
    name: string;
    tags?: string;
    file: File;
}

export const uploadDocument = async (data: UploadDocumentParams) => {
    const url = `${BASE_API}/api/documents/upload`;
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.tags) {
        formData.append("tags", data.tags);
    }
    formData.append("file", data.file);

    return await callAPIWhiteToken({
        url,
        method: "POST",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getDocuments = async (search = "", page = 1, limit = 10) => {
    return await callAPIWhiteToken({
        url: `${BASE_API}/api/documents`,
        method: "GET",
        params: {
            page,
            limit,
            search
        }
    });
};

export const getDocumentById = async (id: string) => {
    return await callAPIWhiteToken({
        url: `${BASE_API}/api/documents/${id}`,
        method: "GET",
    });
};

export const updateDocument = async (id: string, data: Partial<UploadDocumentParams>) => {
    const url = `${BASE_API}/api/documents/${id}`;
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.tags) formData.append("tags", data.tags);
    if (data.file instanceof File) formData.append("file", data.file);

    return await callAPIWhiteToken({
        url,
        method: "PUT",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteDocument = async (id: string) => {
    return await callAPIWhiteToken({
        url: `${BASE_API}/api/documents/${id}`,
        method: "DELETE",
    });
};
