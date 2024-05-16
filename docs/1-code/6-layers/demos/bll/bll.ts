import {
	type Activity,
	type Booking,
	insertBooking,
	selectActivityById,
	selectAllActivities,
	selectBookingsByActivityId,
} from "../dal/dal";

export const listActivities = (): Activity[] => {
	const activities = selectAllActivities();
	// filter, order, or otherwise manipulate the data
	return activities;
};

export const bookActivity = (booking: Booking): void => {
	const activity = selectActivityById(booking.activityId);
	if (!activity || !activity.id) {
		throw new Error("Activity not found");
	}
	const bookings = selectBookingsByActivityId(activity.id);
	let bookedPlaces = 0;
	for (const bookingItem of bookings) {
		bookedPlaces += bookingItem.places;
	}
	const availablePlaces = activity.capacity - bookedPlaces;
	if (availablePlaces < booking.places) {
		throw new Error("Not enough capacity");
	}
	booking.status = "confirmed";
	insertBooking(booking);
};
