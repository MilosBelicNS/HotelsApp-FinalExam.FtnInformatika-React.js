using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotelsApp.Asp.NetWebApi.Models
{
    public class RoomsDto
    {

      
        public HotelChain HotelChain { get; set; }
        public int TotalNumbOfRooms { get; set; }
    }
}