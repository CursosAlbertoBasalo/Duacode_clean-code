export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
	id?: number;
	activityId: number;
	client: string;
	places: number;
	status: BookingStatus;
};
