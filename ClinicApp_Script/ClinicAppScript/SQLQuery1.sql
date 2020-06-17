USE [ClinicApp]
GO
/* RESET CONSTRAINTS */
IF(OBJECT_ID(N'fkClinical_Job') IS NOT NULL) BEGIN ALTER TABLE dbo.Clinical DROP CONSTRAINT fkClinical_Job END;
IF(OBJECT_ID(N'fkClinical_Building') IS NOT NULL) BEGIN ALTER TABLE dbo.Clinical DROP CONSTRAINT fkClinical_Building END;
IF(OBJECT_ID(N'pkClinical') IS NOT NULL) BEGIN ALTER TABLE dbo.Clinical DROP CONSTRAINT pkClinical END;
IF(OBJECT_ID(N'pkJob') IS NOT NULL) BEGIN ALTER TABLE dbo.Job DROP CONSTRAINT pkJob END;
IF(OBJECT_ID(N'pkBuilding') IS NOT NULL) BEGIN ALTER TABLE dbo.Building DROP CONSTRAINT pkBuilding END;
IF(OBJECT_ID(N'pk_ScheduleDetail') IS NOT NULL) BEGIN ALTER TABLE dbo.ScheduleDetail DROP CONSTRAINT pk_ScheduleDetail END;
IF(OBJECT_ID(N'fk_ScheduleDetail_Schedule') IS NOT NULL) BEGIN ALTER TABLE dbo.ScheduleDetail DROP CONSTRAINT fk_ScheduleDetail_Schedule END;
IF(OBJECT_ID(N'pk_Schedule') IS NOT NULL) BEGIN ALTER TABLE dbo.Schedule DROP CONSTRAINT pk_Schedule END;


/* RESET TABLES*/
IF(OBJECT_ID(N'dbo.Schedule') IS NOT NULL) BEGIN DROP TABLE dbo.Schedule END;
IF(OBJECT_ID(N'dbo.ScheduleDetail') IS NOT NULL) BEGIN DROP TABLE dbo.ScheduleDetail END;
IF(OBJECT_ID(N'dbo.Job') IS NOT NULL) BEGIN DROP TABLE dbo.Job END;
IF(OBJECT_ID(N'dbo.Building') IS NOT NULL) BEGIN DROP TABLE dbo.Building END;
IF(OBJECT_ID(N'dbo.Clinical') IS NOT NULL) BEGIN DROP TABLE dbo.Clinical END;



 /* CREATE TABLES */
CREATE TABLE dbo.Schedule (
	scheduleID				INT NOT NULL IDENTITY(1,1),
	scheduleName			VARCHAR(100) NOT NULL,
	scheduleNameDescription VARCHAR(300) NOT NULL,
	isActive				BIT NOT NULL,

	CONSTRAINT pk_Schedule PRIMARY KEY (scheduleID)
);
CREATE TABLE dbo.ScheduleDetail (
	scheduleDetailID		INT NOT NULL IDENTITY(1,1),
	scheduleID				INT NOT NULL,
	weekdayName				VARCHAR(30) NOT NULL,
	startTime				NVARCHAR(80) NULL,
	endTime					NVARCHAR(80) NULL,
	dayNumber				INT NOT NULL,

	CONSTRAINT pk_ScheduleDetail PRIMARY KEY (scheduleDetailID),
	CONSTRAINT fk_ScheduleDetail_Schedule FOREIGN KEY (scheduleID) REFERENCES dbo.Schedule (scheduleID)
);
CREATE TABLE dbo.Job (
	jobID		INT NOT NULL,
	jobName		VARCHAR(150) NOT NULL,

	CONSTRAINT pkJob PRIMARY KEY(jobID)
);
CREATE TABLE dbo.Building (
	buildingID		INT NOT NULL,
	buildingName	VARCHAR(100) NOT NULL,

	CONSTRAINT pkBuilding PRIMARY KEY (buildingID)
);
CREATE TABLE dbo.Clinical (
	clinicalID				INT NOT NULL,
	clinicalName			VARCHAR(250) NOT NULL,
	clinicalEmail			VARCHAR(250) NOT NULL,
	clinicalCollegateNumber INT NOT NULL,
	jobID					INT NOT NULL,
	buildingID				INT NOT NULL,

	CONSTRAINT pkClinical PRIMARY KEY (clinicalID),
	CONSTRAINT fkClinical_Job FOREIGN KEY (jobID) REFERENCES dbo.Job (jobID),
	CONSTRAINT fkClinical_Building FOREIGN KEY (buildingID) REFERENCES dbo.Building (buildingID)
);



/* SET TESTING VALUES */
INSERT INTO dbo.Schedule (scheduleName, scheduleNameDescription, isActive) VALUES('Daytime','Daytime production schedule',1);

INSERT INTO dbo.ScheduleDetail (scheduleID, weekdayName, startTime, endTime ,dayNumber) VALUES(1,'Sunday',		NULL,		NULL,		1);
INSERT INTO dbo.ScheduleDetail (scheduleID, weekdayName, startTime, endTime ,dayNumber) VALUES(1,'Monday',		'6:00 AM',	'3:30 PM',	2);
INSERT INTO dbo.ScheduleDetail (scheduleID, weekdayName, startTime, endTime ,dayNumber) VALUES(1,'Tuesday',		'6:00 AM',	'3:30 PM',	3);
INSERT INTO dbo.ScheduleDetail (scheduleID, weekdayName, startTime, endTime ,dayNumber) VALUES(1,'Wednesday',	'6:00 AM',	'3:30 PM',	4);
INSERT INTO dbo.ScheduleDetail (scheduleID, weekdayName, startTime, endTime ,dayNumber) VALUES(1,'Thursday',	'6:00 AM',	'3:30 PM',	5);
INSERT INTO dbo.ScheduleDetail (scheduleID, weekdayName, startTime, endTime ,dayNumber) VALUES(1,'Friday',		'6:00 AM',	'3:30 PM',	6);
INSERT INTO dbo.ScheduleDetail (scheduleID, weekdayName, startTime, endTime ,dayNumber) VALUES(1,'Saturday',	NULL,		NULL,		7);
