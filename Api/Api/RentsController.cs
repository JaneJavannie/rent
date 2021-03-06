﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentApi.Api.DTO;
using RentApi.Api.Extensions;
using RentApi.Application;
using RentApi.Infrastructure.Database;
using RentApi.Infrastructure.Database.Models;
using SmartAnalytics.BASF.Backend.Infrastructure;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Reflection;
using System.Threading.Tasks;

namespace RentApi.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Rents
        [HttpGet]
        public async Task<ActionResult<RentDTO[]>> GetRents(int? shopId,
            int _start = 0, int _end = 10,
            string _sort = "id", string _order = "DESC",
            bool opened = false, DateTime? endLte = null,
            string q = ""
            )
        {
            var query = _context.Rent.AsQueryable();

            if (shopId.HasValue)
            {
                query = query.Where(x => x.ShopId == shopId);
            }

            if (opened)
            {
                query = query.Where(x => x.Closed == null);
            }

            if (endLte != null)
            {
                query = query.Where(x => x.Closed == null && x.To <= endLte.Value.Ceil(TimeSpan.FromDays(1)).ToUniversalTime());
            }

            if (!string.IsNullOrWhiteSpace(q))
            {
                query = query.Where(x =>
                EF.Functions.ILike(x.Id.ToString(), $"%{q}%") ||
                EF.Functions.ILike(x.Customer, $"%{q}%") || 
                EF.Functions.ILike(x.Comment, $"%{q}%"));
            }

            var count = await query.CountAsync();
            HttpContext.SetTotalCount(count);

            var result = await query
                .OrderBy($"{_sort} {_order}")
                .Skip(_start)
                .Take(_end - _start)
                .ToDTO()
                .ToArrayAsync();

            return result;
        }

        [HttpGet("many")]
        public async Task<ActionResult<RentDTO[]>> GetMany([FromQuery] int[] id)
        {
            var result = await _context.Rent
                .Where(x => id.Contains(x.Id))
                .ToDTO()
                .ToArrayAsync();

            return result;
        }

        // GET: api/Rents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RentDTO>> GetRent(int id)
        {
            var rent = await _context.Rent.Where(x => x.Id == id)
                .ToDTO()
                .FirstOrDefaultAsync();

            if (rent == null)
            {
                return NotFound();
            }

            return rent;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<RentDTO>> PutRent(int id, RentDTO dto)
        {
            var rent = await _context.Rent.Include(x => x.RentEquipment).FirstOrDefaultAsync(x => x.Id == id);
            if (rent == null)
            {
                return NotFound();
            }

            if (HttpContext.IsAdmin())
            {
                rent.ShopId = dto.ShopId;
            }

            rent.Customer = dto.Customer;
            rent.From = dto.From;
            rent.To = dto.To;
            rent.Closed = dto.Closed;
            rent.Payment = dto.Payment;
            rent.Comment = dto.Comment;
            rent.RentEquipment = dto.EquipmentIds.Select(x => new RentEquipment { EquipmentId = x }).ToList();

            await _context.SaveChangesAsync();

            return dto;
        }

        [HttpPost]
        public async Task<ActionResult<RentDTO>> PostRent(RentDTO dto)
        {
            var shopId = HttpContext.IsAdmin() ? dto.ShopId : HttpContext.GetShopId();

            var rent = new Rent
            {
                EmployeeId = HttpContext.GetEmployeeId(),
                Customer = dto.Customer,
                ShopId = shopId,
                From = dto.From,
                To = dto.To,
                Closed = null,
                Payment = dto.Payment,
                Comment = dto.Comment,
                RentEquipment = dto.EquipmentIds?.Select(x => new RentEquipment { EquipmentId = x }).ToList()
            };
            _context.Rent.Add(rent);
            await _context.SaveChangesAsync();

            dto.Id = rent.Id;

            return CreatedAtAction("GetRent", new { id = rent.Id }, dto);
        }

        // DELETE: api/Rents/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Rent>> DeleteRent(int id)
        {
            var rent = await _context.Rent.FindAsync(id);
            if (rent == null)
            {
                return NotFound();
            }

            _context.Rent.Remove(rent);
            await _context.SaveChangesAsync();

            return rent;
        }
    }
}
