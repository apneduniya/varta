

export interface NewsListDataObject {
    link: string;
    title: string;
    publish_date: string;
    source: string;
    preview_image: string;
}


export interface NewsDataObject {
    summary: string;
}


export interface NewsOutletDataObject {
    id: number;
    icon: string;
    name: string;
    type: string;
    url: string;
    language: string;
    selected?: boolean;
}


export interface UserDetailsObject {
    _id: string;
    name: string;
    email: string;
    role: string;
    created_at: string;
    preferred_sources: string[];
    user_interests: string[];
    subscription_status: boolean;
    subscription_frequency: string;
}


export interface CommonAPIResponse {
    status: 'success' | 'error';
    message?: string;
}


