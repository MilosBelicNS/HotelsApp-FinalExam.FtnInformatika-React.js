using HotelsApp.Asp.NetWebApi.Controllers;
using HotelsApp.Asp.NetWebApi.Interfaces;
using HotelsApp.Asp.NetWebApi.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Results;

namespace HotelsApp.Asp.NetWebApi.Tests.Controllers
{
    [TestClass]
    public class HotelsControllerTest
    {
        [TestMethod]
        public void GetReturnsHotelWithSameId()
        {
            // Arrange
            var mockRepository = new Mock<IHotelRepository>();
            mockRepository.Setup(x => x.GetById(42)).Returns(new Hotel { Id = 42 });

            var controller = new HotelsController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.GetById(42);
            var contentResult = actionResult as OkNegotiatedContentResult<Hotel>;

            // Assert
            Assert.IsNotNull(contentResult);
            Assert.IsNotNull(contentResult.Content);
            Assert.AreEqual(42, contentResult.Content.Id);
        }

        [TestMethod]
        public void PutReturnsBadRequest()
        {
            // Arrange
            var mockRepository = new Mock<IHotelRepository>();
            var controller = new HotelsController(mockRepository.Object);

            // Act
            IHttpActionResult actionResult = controller.Put(10, new Hotel { Id = 9, Name = "Hotel 1" });

            // Assert
            Assert.IsInstanceOfType(actionResult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void GetReturnsMultipleObjects()
        {
            // Arrange
            List<Hotel> hoteli = new List<Hotel>();
            hoteli.Add(new Hotel { Id = 1, Name = "Hotel1" });
            hoteli.Add(new Hotel { Id = 2, Name = "Hotel2" });

            var mockRepository = new Mock<IHotelRepository>();
            mockRepository.Setup(x => x.GetAll()).Returns(hoteli.AsEnumerable());
            var controller = new HotelsController(mockRepository.Object);

            // Act
            IEnumerable<Hotel> result = controller.GetAll();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(hoteli.Count, result.ToList().Count);
            Assert.AreEqual(hoteli.ElementAt(0), result.ElementAt(0));
            Assert.AreEqual(hoteli.ElementAt(1), result.ElementAt(1));
        }

        [TestMethod]
        public void PostReturnsMultipleObjects()
        {
            // Arrange
            List<Hotel> hoteli = new List<Hotel>();
            hoteli.Add(new Hotel { Id = 1, Name = "Hotel1", NumberOfRooms = 50 });
            hoteli.Add(new Hotel { Id = 2, Name = "Hotel2", NumberOfRooms = 100 });

            var filter = new Filter() { Min = 30, Max = 150 };

            var mockRepository = new Mock<IHotelRepository>();
            mockRepository.Setup(x => x.Search(filter)).Returns(hoteli.AsEnumerable());
            var controller = new HotelsController(mockRepository.Object);

            // Act
            IEnumerable<Hotel> result = controller.Capacity(filter);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(hoteli.Count, result.ToList().Count);

        }
    }
}
