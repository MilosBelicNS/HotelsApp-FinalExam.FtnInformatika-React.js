namespace HotelsApp.Asp.NetWebApi.Migrations
{
    using HotelsApp.Asp.NetWebApi.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<HotelsApp.Asp.NetWebApi.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(HotelsApp.Asp.NetWebApi.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            context.HotelChains.AddOrUpdate(
                new HotelChain() { Name = "Hilton Worldwide", EstablishmentYear = 1919 },
                new HotelChain() { Name = "Marriott International", EstablishmentYear = 1927 },
                new HotelChain() { Name = "Kempinski", EstablishmentYear = 1897 }
                );

            context.SaveChanges();

            context.Hotels.AddOrUpdate(
                new Hotel() { Name = "Sheraton Novi Sad", OpeningYear = 2018, EmployeesNumber = 70, NumberOfRooms = 150, HotelChainId = 2 },
                new Hotel() { Name = "Hilton Belgrade", OpeningYear = 2017, EmployeesNumber = 100, NumberOfRooms = 242, HotelChainId = 1 },
                new Hotel() { Name = "Palais Hansen", OpeningYear = 2013, EmployeesNumber = 80, NumberOfRooms = 152, HotelChainId = 3 },
                new Hotel() { Name = "Budapest Marriott", OpeningYear = 1994, EmployeesNumber = 180, NumberOfRooms = 364, HotelChainId = 2 },
                new Hotel() { Name = "Hilton Berlin", OpeningYear = 1991, EmployeesNumber = 200, NumberOfRooms = 601, HotelChainId = 1 }
                );
        }
    }
}
