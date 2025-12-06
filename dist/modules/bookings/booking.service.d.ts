export declare class BookingService {
    createBooking(data: any): Promise<any>;
    getBookings(user: any): Promise<any[]>;
    getBookingById(bookingId: number, user: any): Promise<any>;
    updateBooking(bookingId: number, status: string): Promise<any>;
    cancelBooking(bookingId: number, user: any): Promise<any>;
}
//# sourceMappingURL=booking.service.d.ts.map