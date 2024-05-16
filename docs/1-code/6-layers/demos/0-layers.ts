import * as fs from "fs";
import express, { type Request, type Response } from "express";

const activitiesFilePath = "./src/data/activities.json";
const bookingsFilePath = "./src/data/bookings.json";
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/activities", (req: Request, res: Response) => {
	try {
		const activities: Activity[] = listActivities();
		res.json(activities);
	} catch (error) {
		res.status(500).send("Error fetching activities");
	}
});

app.post("/bookings", (req: Request, res: Response) => {
	const { activityId, client, places } = req.body;
	if (!activityId || !client || !places) {
		res.status(400).send("Please provide activityId, client, and places");
		return;
	}
	const status: BookingStatus = "pending";
	const booking: Booking = {
		activityId,
		client,
		places,
		status,
	};

	try {
		bookActivity(booking);
		res.status(201).json(booking);
	} catch (error) {
		res.status(500).send("Error booking activity");
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

const listActivities = (): Activity[] => {
	const activities = selectAllActivities();
	return activities;
};

const bookActivity = (booking: Booking): void => {
	const activity = selectActivityById(booking.activityId);
	if (!activity || !activity.id) {
		throw new Error("Activity not found");
	}
	const bookings = selectBookingsByActivityId(activity.id);
	let bookedPlaces = 0;
	for (const bookingItem of bookings) {
		bookedPlaces += bookingItem.places;
	}
	if (activity.capacity < bookedPlaces + booking.places) {
		throw new Error("Not enough capacity");
	}
	booking.status = "confirmed";
	insertBooking(booking);
};

const selectAllActivities = (): Activity[] => {
	const activitiesData = fs.readFileSync(activitiesFilePath, "utf8");
	return JSON.parse(activitiesData);
};
const selectActivityById = (id: number): Activity | undefined => {
	const activities = selectAllActivities();
	const found = activities.filter((activity) => activity.id === id);
	return found.length > 0 ? found[0] : undefined;
};

const selectAllBookings = (): Booking[] => {
	const bookingsData = fs.readFileSync(bookingsFilePath, "utf8");
	return JSON.parse(bookingsData);
};

const selectBookingsByActivityId = (activityId: number): Booking[] => {
	const bookings = selectAllBookings();
	return bookings.filter((booking) => booking.activityId === activityId);
};

const insertBooking = (booking: Booking): void => {
	const bookings = selectAllBookings();
	booking.id = bookings.length + 1;
	bookings.push(booking);
	fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2));
};

type Activity = {
	id?: number;
	name: string;
	price: number;
	capacity: number;
};

type BookingStatus = "pending" | "confirmed" | "cancelled";

type Booking = {
	id?: number;
	activityId: number;
	client: string;
	places: number;
	status: BookingStatus;
};
