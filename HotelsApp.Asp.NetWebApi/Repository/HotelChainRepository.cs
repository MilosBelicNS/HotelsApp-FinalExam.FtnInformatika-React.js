using HotelsApp.Asp.NetWebApi.Interfaces;
using HotelsApp.Asp.NetWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HotelsApp.Asp.NetWebApi.Repository
{
    public class HotelChainRepository:IDisposable, IHotelChainRepository
    {
        private ApplicationDbContext db = new ApplicationDbContext();


        public HotelChain GetById(int id)
        {
            return db.HotelChains.Find(id);
        }
        public IEnumerable<HotelChain> GetAll()
        {
            return db.HotelChains;
        }

        public IEnumerable<HotelChain> GetTradition()
        {
            var htChains = db.HotelChains.OrderBy(h => h.EstablishmentYear);

            yield return htChains.ElementAt(0);
            yield return htChains.ElementAt(1);
        }

        public IEnumerable<HotelChainDto> GetEmployees()
        {
            var emps = db.Hotels.GroupBy(h => h.HotelChain, h => h.EmployeesNumber, (hotelChain, employeesNumber) => new HotelChainDto()
            {
                HotelChain = hotelChain.Name,
                AvNumbEmployees = employeesNumber.Average()
            }).OrderByDescending(h => h.AvNumbEmployees);

            return emps;
        }

        public IEnumerable<HotelChain> PostNumbOfRooms(Border border)
        {
            var rms = db.Hotels.GroupBy(r => r.HotelChain, r => r.NumberOfRooms, (hotelChain, numbOfRooms) => new RoomsDto
            {
                HotelChain = hotelChain,
                TotalNumbOfRooms = numbOfRooms.Sum()
            }).OrderBy(r => r.TotalNumbOfRooms);

            var htlch = new List<HotelChain>();
            foreach (RoomsDto r in rms)
            {
                if (r.TotalNumbOfRooms > border.Min)
                {
                    htlch.Add(r.HotelChain);
                }
            }
            return htlch;


        }


        public void Dispose(bool disposing)
        {
            if(disposing)
            {
                if(db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}