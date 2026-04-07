CREATE TABLE `businesses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` varchar(64) NOT NULL,
	`name` text,
	`phoneNumber` varchar(20),
	`forliNumber` varchar(20),
	`onboardingState` enum('NEW','AWAITING_004','AWAITING_67','AWAITING_6762','AWAITING_676261','ACTIVE_FULL','ACTIVE_NO_ANSWER','ACTIVE_EXTENDED','ACTIVE_COMPLETE','FAILED') NOT NULL DEFAULT 'NEW',
	`verifiedCodes` json DEFAULT ('[]'),
	`carrier` varchar(64),
	`carrierBlocks004` boolean DEFAULT false,
	`onboardingStartedAt` timestamp,
	`onboardingCompletedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `businesses_id` PRIMARY KEY(`id`),
	CONSTRAINT `businesses_clientId_unique` UNIQUE(`clientId`)
);
--> statement-breakpoint
CREATE TABLE `onboarding_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`codeAttempted` varchar(10) NOT NULL,
	`twilioCallSid` varchar(64),
	`result` enum('pending','success','failed') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`resolvedAt` timestamp,
	CONSTRAINT `onboarding_attempts_id` PRIMARY KEY(`id`)
);
