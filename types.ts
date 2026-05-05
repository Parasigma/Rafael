export interface Guest {
  id: string;
  fullName: string;
  email: string;
  attending: 'yes' | 'no' | 'pending';
  companions: number;
  dietaryRestrictions: string;
  needsTransport: string;
  message: string;
  wantsToBeCaptain?: boolean; // New field
  submittedAt: string;
}

export interface WeatherData {
  temperature: string;
  condition: string;
  description: string;
  icon: string;
  location: string;
}

export enum ViewMode {
  GUEST = 'GUEST',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD'
}

export interface DashboardStats {
  totalResponses: number;
  attendingCount: number;
  notAttendingCount: number;
  totalGuests: number;
  dietaryCount: number;
}

export type GuestCategory = 'friend' | 'family_rafa' | 'family_laura' | 'other';

export interface Seat {
  id: string;
  guestName: string | null; // If null, it's empty
  isReserved: boolean;
  suggestedBy?: string | null; // Name of person who suggested this seat
  category: GuestCategory;
  isStroller?: boolean; // If true, this seat is for a baby stroller
  isCaptain?: boolean; // New field for Table Captain
}

export interface TableData {
  id: string;
  label: string;
  type: 'round' | 'rect';
  x: number; // Percent 0-100
  y: number; // Percent 0-100
  seats: Seat[];
}