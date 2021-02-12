using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HotelsApp.Asp.NetWebApi.Models
{
    public class Hotel
    {

        public int Id { get; set; }
        [Required]
        [StringLength(75)]
        public string Name { get; set; }
        [Required]
        [Range(1950, 2020)]
        public int OpeningYear { get; set; }
        [Required]
        [Range(2, Int32.MaxValue)]
        public int EmployeesNumber { get; set; }
        [Required]
        [Range(10, 999)]
        public int NumberOfRooms { get; set; }
        public int HotelChainId { get; set; }
        public HotelChain HotelChain { get; set; }
    }
}