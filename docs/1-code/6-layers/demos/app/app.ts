import express, { type Request, type Response } from "express";

import { bookActivity, listActivities } from "../bll/bll";
import type { Activity, Booking, BookingStatus } from "../dal/dal";

const PORT = 3000;
const app = express();

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
	const booking: Booking = {
		activityId,
		client,
		places,
		status: "pending",
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
