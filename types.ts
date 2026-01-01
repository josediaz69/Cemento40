export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

export interface NavLink {
    name: string;
    path: string;
}

export enum ServiceType {
    PROCESS = 'process',
    ELECTRICAL = 'electrical',
    AUTOMATION = 'automation',
    CONTROL = 'control',
    INFO = 'info',
    COMMISSIONING = 'commissioning',
    AUDITS = 'audits',
    OPTIMIZATION = 'optimization',
    CFD = 'cfd'
}