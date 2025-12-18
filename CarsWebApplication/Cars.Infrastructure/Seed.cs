using System.ComponentModel;
using Cars.Domain;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Cars.Infrastructure;

public class Seed
{
    public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
    {
        if (context.Cars.Any()) return;

        if (!userManager.Users.Any())
        {
            var users = new List<AppUser>
            {
                new AppUser{DisplayName = "franek", UserName = "frfr", Email = "franek@dzbanek.com", Bio = ""},
                new AppUser{DisplayName = "asia", UserName = "asiula", Email = "asiula@dzbanek.com", Bio = ""},
                new AppUser{DisplayName = "darek", UserName = "daro", Email = "daro@dzbanek.com", Bio = ""},
                new AppUser{DisplayName = "michal", UserName = "michi", Email = "michi@dzbanek.com", Bio = ""},
            };

            foreach(var user in users)
            {
                await userManager.CreateAsync(user, "Hase!l0123");
            }
        }

        var cars = new List<Car>
        {
            new Car
            {
                Brand = "Mazda",
                Model = "CX60",
                DoorsNumber = 5,
                LuggageCapacity = 570,
                EngineCapacity = 2488,
                FuelType = FuelType.Hybrid,
                ProductionDate = DateTime.UtcNow.AddMonths(-1),
                CarFuelConsumption = 18.1,
                BodyType = BodyType.SUV
            }
        };

        await context.Cars.AddRangeAsync(cars);
        await context.SaveChangesAsync();
    }
}