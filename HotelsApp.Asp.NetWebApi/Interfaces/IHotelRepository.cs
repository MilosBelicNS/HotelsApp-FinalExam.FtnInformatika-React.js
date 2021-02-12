using HotelsApp.Asp.NetWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelsApp.Asp.NetWebApi.Interfaces
{
   public interface IHotelRepository
    {
        IEnumerable<Hotel> GetAll();
        IEnumerable<Hotel> GetByEmployeesNum(int minimum);
        IEnumerable<Hotel> Search(Filter filter);
        Hotel GetById(int id);
        void Create(Hotel hotel);
        void Update(Hotel hotel);
        void Delete(Hotel hotel);

    }
}
