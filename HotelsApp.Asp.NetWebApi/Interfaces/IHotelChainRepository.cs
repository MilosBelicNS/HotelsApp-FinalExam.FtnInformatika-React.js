using HotelsApp.Asp.NetWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelsApp.Asp.NetWebApi.Interfaces
{
    public interface IHotelChainRepository
    {
        IEnumerable<HotelChain> GetAll();
        IEnumerable<HotelChain> GetTradition();
        IEnumerable<HotelChainDto> GetEmployees();
        IEnumerable<HotelChain> PostNumbOfRooms(Border border);
        HotelChain GetById(int id);

    }
}
