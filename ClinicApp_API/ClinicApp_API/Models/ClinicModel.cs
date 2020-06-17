using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClinicApp_API.Models
{
    public class ScheduleItem
    {
        public int key { get; set; }
        public string scheduleName { get; set; }
        public string scheduleDescrip { get; set; }
        public bool isActive { get; set; }
        public ICollection<Day> days { get; set; }
    }

    public class Day
    {
        public string dayName { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public string dayDescrip { get; set; }
        public bool isWorkingDay { get; set; }
    }
}