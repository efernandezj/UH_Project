using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace ClinicApp_API.Models
{
    public class ClinicDAO
    {
        private readonly ClinicAppEntities _DbContext;

        public ClinicDAO()
        {
            _DbContext = new ClinicAppEntities();
        }

        public List<ScheduleItem> GetSchedules()
        {
            List<Schedule> schedules = (from result in _DbContext.Schedules
                                        where (bool)result.isActive
                                        select result).ToList();
            return (from schedule in schedules
                    select new ScheduleItem() 
                    {
                        key = schedule.scheduleID,
                        scheduleName = schedule.scheduleName,
                        scheduleDescrip = schedule.scheduleNameDescription,
                        isActive = schedule.isActive,
                        days = (from day in schedule.ScheduleDetails 
                                select new Day()
                                {
                                    dayName = day.weekdayName,
                                    dayDescrip = (day.startTime.HasValue)? "This is a business day" : "DayOff",
                                    startTime = day.startTime,
                                    endTime = day.endTime,
                                    isWorkingDay = day.startTime.HasValue
                                }).ToList()
                    }).ToList();
        }

        public void CreateEntity<T>(T Entity) where T : class
        {
            _DbContext.Set<T>().Add(Entity);
        }
        public void DeleteEntity<T>(T Entity) where T : class
        {
            _DbContext.Set<T>().Remove(Entity);
        }
        public void DeleteEntities<T>(ICollection<T> Entities) where T : class
        {
            _DbContext.Set<T>().RemoveRange(Entities);
        }
        public void SaveChanges()
        {
            _DbContext.SaveChanges();
        }

    }
}