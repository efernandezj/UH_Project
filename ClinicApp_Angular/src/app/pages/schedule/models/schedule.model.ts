export class Schedule {
    public key: number;
    public scheduleName: string;
    public scheduleDescrip: string;
    public isActive: boolean;
    public days: Day[]
}

export class Day {
    dayName: string;
    startTime: string;
    endTime: string;
}
export class ScheduleHour {
    // public key: number;
    public weekDayName: string;
    // public weekDayNumber: number;
    public startTime: string;
    public endTime: string;

    constructor() { }
}