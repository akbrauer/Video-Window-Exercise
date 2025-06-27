import type { ErrorInfo } from "react";

let lastLoggedAt = 0;
const ERROR_THROTTLE_MS = 10000;

// !!!!DEVELOPER!!! Set this to your api endpoint to log errors to your server!
const apiEndpoint = "";

const logErrorToServer = (error: Error, errorInfo?: ErrorInfo) => {
	const now = Date.now();
	if (now - lastLoggedAt < ERROR_THROTTLE_MS) return;
	lastLoggedAt = now;

	const errorData = {
		message: error.message,
		stack: error.stack,
		componentStack: errorInfo?.componentStack,
		timestamp: new Date().toISOString(),
	};

	if (apiEndpoint) {
		fetch("/api/logError", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(errorData),
		})
			.then(res => {
				if (!res.ok) {
					console.error("Failed to log error:", res.status);
				} else {
					console.log("Error successfully logged to backend");
				}
			})
			.catch(err => {
				console.error("Logging failed:", err);
			});
	} else {
		console.log("⚠️ No API endpoint set for error logging. Please set 'apiEndpoint' in errorLogger.ts ⚠️");
		console.log("Error message:", error.message);
		console.log("Stack trace:", error.stack);
		if (errorInfo?.componentStack) {
			console.log("Component stack:", errorInfo.componentStack);
		}
	}
};

export default logErrorToServer;
