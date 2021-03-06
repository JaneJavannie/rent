﻿using System.Collections.Generic;

namespace RentApi.Infrastructure.Database.Models
{
    public class EquipmentType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PricePerHour { get; set; }
        public int PricePerDay { get; set; }
        public bool Archived { get; set; }

        public List<Equipment> Equipment { get; set; }
    }
}
