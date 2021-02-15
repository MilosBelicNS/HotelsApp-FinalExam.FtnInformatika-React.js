using HotelsApp.Asp.NetWebApi.Interfaces;
using HotelsApp.Asp.NetWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace HotelsApp.Asp.NetWebApi.Repository
{
    public class HotelRepository:IHotelRepository,IDisposable
    {

        private ApplicationDbContext db = new ApplicationDbContext();

        public IEnumerable<Hotel> GetAll()
        {
            return db.Hotels.Include(h => h.HotelChain);
        }


        public IEnumerable<Hotel> GetByEmployeesNum(int minimum)
        {
            var htls = db.Hotels.Include(h => h.HotelChain).Where(h => h.EmployeesNumber >= minimum).OrderBy(h => h.EmployeesNumber);
            return htls;
        }

        public IEnumerable<Hotel> Search(Filter filter)
        {
            var htls = db.Hotels.Include(h => h.HotelChain).Where(h => h.NumberOfRooms >= filter.Min & h.NumberOfRooms <= filter.Max).OrderByDescending(h => h.NumberOfRooms);
            return htls;
        }

        public Hotel GetById(int id)
        {
            return db.Hotels.Find(id);
        }


        public void Create(Hotel hotel)
        {
             db.Hotels.Add(hotel);
            db.SaveChanges();
        }

        public void Delete(Hotel hotel)
        {
            db.Hotels.Remove(hotel);
            db.SaveChanges();
        }

        public void Update(Hotel hotel)
        {
            db.Entry(hotel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch(DbUpdateConcurrencyException)
            {
                throw;
            }
        }
        public void Dispose(bool disposing)
        {
            if(disposing)
            {
                if(db !=null)
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