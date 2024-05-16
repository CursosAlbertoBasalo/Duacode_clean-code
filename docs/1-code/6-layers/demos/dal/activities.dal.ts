import * as fs from "fs";
import type { Activity } from "../model/activity.model";

const activitiesFilePath = "./src/data/activities.json";

export const selectAllActivities = (): Activity[] => {
	const activitiesData = fs.readFileSync(activitiesFilePath, "utf8");
	return JSON.parse(activitiesData);
};
export const selectActivityById = (id: number): Activity | undefined => {
	const activities = selectAllActivities();
	const found = activities.filter((activity) => activity.id === id);
	return found.length > 0 ? found[0] : undefined;
};
