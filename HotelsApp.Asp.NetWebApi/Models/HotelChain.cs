using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HotelsApp.Asp.NetWebApi.Models
{
    public class HotelChain
    {


        public int Id { get; set; }
        [Required]
        [StringLength(75)]
        public string Name { get; set; }
        [Required]
        [Range(1850, 2010)]
        public int EstablishmentYear { get; set; }
    }
}