import * as fs from "fs";
import type { Booking } from "../model/booking.model";

const bookingsFilePath = "./src/data/bookings.json";

export const insertBooking = (booking: Booking): void => {
	const bookings = selectAllBookings();
	booking.id = bookings.length + 1;
	bookings.push(booking);
	fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2));
};

const selectAllBookings = (): Booking[] => {
	const bookingsData = fs.readFileSync(bookingsFilePath, "utf8");
	return JSON.parse(bookingsData);
};

export const selectBookingsByActivityId = (activityId: number): Booking[] => {
	const bookings = selectAllBookings();
	return bookings.filter((booking) => booking.activityId === activityId);
};
