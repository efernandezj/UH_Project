using ClinicApp_API.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Web.Http;
using AlignFramework.Helpers;

namespace ClinicApp_API.Controllers
{
    public class ScheduleController : ApiController
    {
        private readonly ClinicDAO _DAO;

        public ScheduleController()
        {
            _DAO = new ClinicDAO();
        }

        // GET api/<controller>
        public IHttpActionResult Get()
        {
            string strMessage = string.Empty;

            try
            {
                // Authorization
                // TODO

                // Getting headers
                string strType = Request.Headers.Contains("get_type") ? Request.Headers.GetValues("get_type").FirstOrDefault() : string.Empty;

                if (string.IsNullOrEmpty(strType))
                    throw new CustomException("Header type not provided.");

                // Get account from session
                // TODO


                // Actions Selector
                if (strType == "schedule")
                {
                    return Ok(new
                    {
                        IsCorrect = true,
                        Schedules = _DAO.GetSchedules()
                    }); ;
                }
            }
            catch (CustomException oEx) { strMessage = oEx.Message; }
            catch (Exception oEx)
            {
                return BadRequest(oEx.Message);
            }

            return Ok(new { Message = strMessage, IsCorrect = false });
        }

        // POST api/<controller>
        public IHttpActionResult Post(JObject jsonData)
        {
            string strMessage = string.Empty;

            try
            {
                // Authorization
                // TODO

                // Getting headers
                string strType = Request.Headers.Contains("post_type") ? Request.Headers.GetValues("post_type").FirstOrDefault() : string.Empty;

                if (string.IsNullOrEmpty(strType))
                    throw new CustomException("Header type not provided.");

                // Get account from session
                // TODO


                // Actions Selector
                if (strType == "schedule")
                    return _postSchedule(jsonData);
            }
            catch (CustomException oEx) { strMessage = oEx.Message; }
            catch ( Exception oEx)
            {
                return BadRequest(oEx.Message);
            }

            return Ok(new { Message = strMessage, IsCorrect = false });
        }

        #region Schedule
        private IHttpActionResult _postSchedule(JObject jsonData)
        {
            ScheduleItem scheduleItem = jsonData.ToObject<ScheduleItem>();

            // Create NEW schedule
            Schedule schedule = new Schedule()
            {
                scheduleName = scheduleItem.scheduleName,
                scheduleNameDescription = scheduleItem.scheduleDescrip,
                isActive = true
            };

            // Adding Days
            foreach( Day day in scheduleItem.days)
            {
                var dayNumber = 1;
                _DAO.CreateEntity( new ScheduleDetail() 
                {
                    Schedule = schedule,
                    weekdayName = day.dayName,
                    startTime = day.startTime,
                    endTime = day.endTime,
                    dayNumber = dayNumber
                });
                dayNumber = +1;
            }

            _DAO.SaveChanges();


            return Ok(new
            {
                IsCorrect = true,
                Message = "Schedule saved succesfully.",
                Data = _DAO.GetSchedules()
            });
        }


        #endregion

    }
}