using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;

namespace webapi.Controllers;

    [ApiController]
    [Route("api/[controller]")]
    public class ExcelDataController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] List<ExcelData> excelData)
        {
            // Process the received Excel data here
            return Ok("Data recieved");
        }
    }

