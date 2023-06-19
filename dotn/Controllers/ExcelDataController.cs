using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text.Json;

[ApiController]
[Route("api/ExcelData")]
public class ExcelDataController : ControllerBase
{
    public class ExcelData
    {
        public string Name { get; set; }
        public string Class { get; set; }
        public string RollNo { get; set; }
        public string Company { get; set; }
        public string Status { get; set; }
    }

    [HttpPost]
    public IActionResult Post([FromBody] JsonDocument data)
    {
        // Handle the received data
        // You can access the data properties like data[0].Name, data[0].Class, etc.

        // Create a new list to store the received data
        var receivedData = new List<ExcelData>();

        // Iterate over the received data and extract the values
        foreach (var item in data.RootElement.EnumerateArray())
        {
            var name = item.GetProperty("Name").GetString();
            var className = item.GetProperty("Class").ToString();
            var rollNo = item.GetProperty("RollNo").ToString(); // Convert to string
            var company = item.GetProperty("Company").GetString();
            var status = item.GetProperty("Status").ToString();

            // Create a new ExcelData object to store the current item's data
            var itemData = new ExcelData
            {
                Name = name,
                Class = className,
                RollNo = rollNo,
                Company = company,
                Status = status
            };

            // Add the item's data to the overall receivedData list
            receivedData.Add(itemData);
        }

        // Return the receivedData in the response body
        return Ok(receivedData);
    }
}
