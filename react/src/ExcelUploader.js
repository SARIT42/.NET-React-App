import React, { useState } from 'react';
import './ExcelUploader.css';
import * as XLSX from 'xlsx';
import axios from 'axios';

const ExcelUploader = () => {
  const [jsonData, setJsonData] = useState(null);
//   const [finaldata,setfinaldata] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async(e)=>{
        const fileData = e.target.result;
        const workbook = XLSX.read(fileData, {type:'binary'});
        //Assuming excel file contains only one sheet.
        const worksheet  = workbook.Sheets[workbook.SheetNames[0]];
        //y collection
        let jsonData = XLSX.utils.sheet_to_json(worksheet, {header:1});


        // Convert the data into key-value pairs
        const headers = jsonData[0];
        const rows = jsonData.slice(1);
        const convertedData = rows.map((row) => {
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header.trim()] = row[index];
        });
        return rowData;
      });
      const fdata = JSON.stringify(convertedData);
    //   setfinaldata(fdata);
      console.log(fdata);
      console.log(convertedData);
      
      setJsonData(fdata); //fdata
    };

      reader.readAsBinaryString(file);
  };

  const handleFileUpload = async () => {
    if (jsonData) {
      try {
        const response = await axios.post('https://localhost:7264/api/ExcelData', jsonData,
        {
            headers: {
              'Content-Type': 'application/json'
            }
        }); // Replace with your API endpoint
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <div className='excel-uploader'>
      <h2>Excel File Uploader</h2>
      <input type="file" onChange={handleFileChange} accept=".xlsx,.xls,.csv" />
      <button onClick={handleFileUpload}>Upload</button>

      {/* {jsonData && (
        <div className='excel-data'>
          <h3>Uploaded Excel Data :</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(jsonData[0]).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jsonData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
    </div>
  );
};

export default ExcelUploader;