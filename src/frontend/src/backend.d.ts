import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Testimonial {
    customerName: string;
    starRating: bigint;
    avatarInitials: string;
    testimonialText: string;
}
export interface SiteSettings {
    instagramHandle: string;
    phoneNumber: string;
}
export type Time = bigint;
export interface CreateSessionArgs {
    name: string;
    description: string;
    iconName: string;
    durationMinutes: bigint;
    priceUSD: bigint;
}
export interface UpdateSettingsArgs {
    instagramHandle: string;
    phoneNumber: string;
}
export interface CreateBookingRequestArgs {
    date: string;
    name: string;
    time: string;
    email: string;
    message: string;
    sessionID: bigint;
    phone: string;
}
export interface Booking {
    id: bigint;
    status: BookingStatus;
    date: string;
    name: string;
    time: string;
    email: string;
    message: string;
    timestamp: Time;
    sessionID: bigint;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export interface SessionType {
    id: bigint;
    name: string;
    description: string;
    iconName: string;
    durationMinutes: bigint;
    priceUSD: bigint;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_sessionTypeNotFound_success {
    sessionTypeNotFound = "sessionTypeNotFound",
    success = "success"
}
export enum Variant_success_bookingNotFound {
    success = "success",
    bookingNotFound = "bookingNotFound"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBookingRequest(args: CreateBookingRequestArgs): Promise<{
        __kind__: "missingFields";
        missingFields: string;
    } | {
        __kind__: "sessionTypeNotFound";
        sessionTypeNotFound: null;
    } | {
        __kind__: "success";
        success: {
            bookingID: bigint;
        };
    }>;
    createSessionType(args: CreateSessionArgs): Promise<{
        __kind__: "missingFields";
        missingFields: string;
    } | {
        __kind__: "success";
        success: {
            sessionID: bigint;
        };
    }>;
    deleteSessionType(sessionID: bigint): Promise<Variant_sessionTypeNotFound_success>;
    getBookings(): Promise<Array<Booking>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getSessionType(sessionID: bigint): Promise<SessionType | null>;
    getSessionTypes(): Promise<Array<SessionType>>;
    getSiteSettings(): Promise<SiteSettings>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getTimeSlots(): Promise<Array<string>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedBackupTestimonials(): Promise<void>;
    updateBookingStatus(bookingID: bigint, newStatus: BookingStatus): Promise<Variant_success_bookingNotFound>;
    updateSessionType(sessionID: bigint, args: CreateSessionArgs): Promise<{
        __kind__: "missingFields";
        missingFields: string;
    } | {
        __kind__: "sessionTypeNotFound";
        sessionTypeNotFound: null;
    } | {
        __kind__: "success";
        success: null;
    }>;
    updateSiteSettings(args: UpdateSettingsArgs): Promise<{
        __kind__: "missingFields";
        missingFields: string;
    } | {
        __kind__: "success";
        success: null;
    }>;
    updateTimeSlots(newTimeSlots: Array<string>): Promise<void>;
}
