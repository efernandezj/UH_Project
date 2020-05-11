USE [ClinicApp]
GO
IF(OBJECT_ID(N'dbo.Schedule') IS NOT NULL) BEGIN DROP TABLE dbo.Schedule END;
IF(OBJECT_ID(N'dbo.ScheduleDetail') IS NOT NULL) BEGIN DROP TABLE dbo.ScheduleDetail END;



 
CREATE TABLE dbo.Schedule (
	scheduleID		INT NOT NULL,
	scheduleName	VARCHAR(100) NOT NULL,
	isActive		BIT,

	CONSTRAINT pk_Schedule PRIMARY KEY (scheduleID)
);
CREATE TABLE dbo.ScheduleDetail (
	scheduleDetailID		INT NOT NULL,
	scheduleID				INT NOT NULL,
	nameOfName				VARCHAR(30) NOT NULL,
	startTime				VARCHAR(30) NULL,
	endTime					VARCHAR(30) NULL,
	dayNumber				INT NOT NULL,

	CONSTRAINT pk_ScheduleDetail PRIMARY KEY (scheduleDetailID),
	CONSTRAINT fk_ScheduleDetail_Schedule FOREIGN KEY (scheduleID) REFERENCES dbo.Schedule (scheduleID)
);