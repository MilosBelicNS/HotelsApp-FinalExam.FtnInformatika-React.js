using HotelsApp.Asp.NetWebApi.Interfaces;
using HotelsApp.Asp.NetWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace HotelsApp.Asp.NetWebApi.Controllers
{
    public class HotelChainsController : ApiController
    {
        public IHotelChainRepository _repository { get; set; }


        public HotelChainsController(IHotelChainRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<HotelChain> GetAll()
        {
            return _repository.GetAll();
        }

        [Authorize]
        [Route("api/Tradition")]
        public IEnumerable<HotelChain> GetTradition()
        {
            return _repository.GetTradition();
        }

        [Authorize]
        [Route("api/Employees")]
        public IEnumerable<HotelChainDto> Employees()
        {
            return _repository.GetEmployees();
        }

        [Authorize]
        [Route("api/Rooms")]
        public IEnumerable<HotelChain> Rooms(Border border)
        {
            return _repository.PostNumbOfRooms(border);
        }

        [Authorize]
        [ResponseType(typeof(HotelChain))]
        public IHttpActionResult GetById(int id)
        {
            var htchain = _repository.GetById(id);

            if(htchain == null)
            {
                return NotFound();
            }
            return Ok(htchain);
        }


    }
}
