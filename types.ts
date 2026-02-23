
export interface ServiceCardProps {
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
