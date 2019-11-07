using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace LootAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAnyOrigin")]
    public class AuthController : ControllerBase
    {
        /**
         * This is of course just a dummy solution for authenticating users.
         * In a real scenario the user data would be stored in a database with *Hashed passwords*.
         */
        private const string Passphrase = "storesteiner";
        [HttpPost]
        public IActionResult  Post([FromBody] Dictionary<string, string> credentials)
        {
            credentials.TryGetValue("passphrase", out var passphrase);
            if (passphrase != Passphrase) return Unauthorized();
            // Token to store in localstorage for persistent logged in state.
            // In a real scenario the token would have an expiry time.
            var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            return Ok(new Dictionary<string, string> { {"token", token} });

        }
    }
}