import * as fs from "fs";

const activitiesFilePath = "./src/data/activities.json";
const bookingsFilePath = "./src/data/bookings.json";

export const selectAllActivities = (): Activity[] => {
	const activitiesData = fs.readFileSync(activitiesFilePath, "utf8");
	return JSON.parse(activitiesData);
};
export const selectActivityById = (id: number): Activity | undefined => {
	const activities = selectAllActivities();
	const found = activities.filter((activity) => activity.id === id);
	return found.length > 0 ? found[0] : undefined;
};

export const selectBookingsByActivityId = (activityId: number): Booking[] => {
	const bookings = selectAllBookings();
	return bookings.filter((booking) => booking.activityId === activityId);
};

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

export type Activity = {
	id?: number;
	name: string;
	price: number;
	capacity: number;
};

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
	id?: number;
	activityId: number;
	client: string;
	places: number;
	status: BookingStatus;
};
