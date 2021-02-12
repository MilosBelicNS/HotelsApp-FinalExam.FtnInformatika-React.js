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
    public class HotelsController : ApiController
    {

        public IHotelRepository _repository { get; set; }

        public HotelsController(IHotelRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Hotel> GetAll()
        {
            return _repository.GetAll();
        }

        [Authorize]
        public IEnumerable<Hotel> GetByEmployeesNum(int minimum)
        {
            return _repository.GetByEmployeesNum(minimum);
        }

        [Authorize]
        [Route("api/Capacity")]
        public IEnumerable<Hotel> Capacity(Filter filter)
        {
            return _repository.Search(filter);
        }

        [Authorize]
        [ResponseType(typeof(Hotel))]
        public IHttpActionResult GetById(int id)
        {
            var hotel = _repository.GetById(id);

            if (hotel == null)
            {
                return NotFound();
            }
            return Ok(hotel);
        }

        [Authorize]
        [ResponseType(typeof(Hotel))]
        public IHttpActionResult Post(Hotel hotel)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repository.Create(hotel);
            return CreatedAtRoute("DefaultApi", new { Id = hotel.Id }, hotel);
        }

        [Authorize]
        [ResponseType(typeof(Hotel))]
        public IHttpActionResult Put(int id, Hotel hotel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (hotel.Id != id)
            {
                return BadRequest();
            }

            try
            {
                _repository.Update(hotel);
            }
            catch
            {
                return Conflict();
            }
            return Ok(hotel);
        }

        [Authorize]
        [ResponseType(typeof(Hotel))]
        public IHttpActionResult Delete(int id)
        {
            var hotel = _repository.GetById(id);

            if(hotel == null)
            {
                return NotFound();
            }

            _repository.Delete(hotel);
            return Ok();

        }

    }
}
