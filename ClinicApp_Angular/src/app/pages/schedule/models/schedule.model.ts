export class Schedule {
    public key: number;
    public scheduleName: string;
    public scheduleDescrip: string;
    public days: day[]
}

export class day {
    dayName: string;
    startTime: Date;
    endTime: Date;
    isWorkingDay: boolean;
    dayDescrip: string;
}