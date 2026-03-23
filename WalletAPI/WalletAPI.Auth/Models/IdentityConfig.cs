

using Microsoft.AspNetCore.Identity;

namespace WalletAPI.Auth.Models;

public class IdentityConfig
{
    public static async Task CreateTestUsersAsync(IServiceProvider provider)
    {
        var roleManager = provider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = provider.GetRequiredService<UserManager<ApplicationUser>>();

        string username = "admin@test.com";
        string password = "Password1!";
        string roleName = "Admin";

        if (await roleManager.FindByNameAsync(roleName) is null)
        {
            await roleManager.CreateAsync(new IdentityRole(roleName));
        }

        if (await userManager.FindByEmailAsync(username) is null)
        {
            var adminUser = new ApplicationUser
            {
                UserName = username,
                Email = username,
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(adminUser, password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, roleName);
                Console.WriteLine($"Default user created. Username: {adminUser.UserName}, Password: {password}");
            }
        }
    }
}