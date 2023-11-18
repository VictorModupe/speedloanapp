const fs = require("fs")
const path = require('path');
const axios = require('axios');

async function send_message(phone, type = 1, message, sender) {
  // Your variables
  const key = process.env.TEXTNG_OTP_API_KEY;
  const route = "2";

  if (type === 1) {
    const response = await httpPost(process.env.TEXTNG_OTP_API_ROUTER, {
      key,
      phone,
      message,
      route,
      sender,
      siscb: 1
    });

    // Getting the Reference Number
    const reference_text = extractReference(response);
    return response;
  }
}
async function httpPost(url, data) {
  try {
    // Define the request payload
    const postData = new URLSearchParams(data);

    // Make a POST request
    const response = await axios.post(url, postData);

    // Handle the response here
    return response.data;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}

function extractReference(response) {
  // Extract text in front of "Reference:"
  const referenceMatch = /Reference:(.*?)\s*\|\|/.exec(response);
  if (referenceMatch) {
    const referenceText = referenceMatch[1].trim();
    return referenceText;
  }
  return '';
}

function generateUniqueId(len) {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2, len); 
    return timestamp + randomNum;
  }

/**This is the helper function for all calls */
  function response(req,res){
    res.data.statusCode = res.statusCode
    res.data.status = res.success;
    res.send(res.data);
}

function cleanme(data) {
  // This removes all the HTML tags from a string. This will sanitize the input string, and block any HTML tag from entering into the processing.
  try {
    let input = data;
  input = input.replace(/<[^>]*>/g, ''); // Remove HTML tags
  input = input.trim();
  // Replace predefined characters with their corresponding HTML entities
  input = input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  // Prevent JavaScript codes and remove any remaining tags
  input = input.replace(/<script.*?<\/script>/gi, '').replace(/<\/?[^>]+(>|$)/g, '');
  return input;
  } catch (error) {
    console.log(error,'hereee')
    return data
  }
}


function getMailFile(filename,data) {
    const filePath = path.join(__dirname, filename);
    var fileContent = fs.readFileSync(filePath,{encoding:"utf-8"})
    for (var param in data) {
        const regexPattern = new RegExp(`%${param}%`, 'g');
        fileContent = fileContent.replace(regexPattern, data[param]);
    }
    return fileContent
}


function createKey() {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let pass = '';
  
  for (let i = 0; i <= 10; i++) {
      const num = Math.floor(Math.random() * chars.length);
      const tmp = chars.substring(num, num + 1);
      pass += tmp;
  }
  
  return pass;
}

function generateCode(len = 6) {
  const chars = "0123456789"
  let pass = '';
  
  for (let i = 0; i < len; i++) {
      const num = Math.floor(Math.random() * chars.length);
      const tmp = chars.substring(num, num + 1);
      pass += tmp;
  }
  return pass;
}

function getFullURL(req,endpoint) {
  const baseUrl = `${req.protocol}://${req.get('host')}/${endpoint}`;
  return baseUrl
}

// Helper functions for Unix timestamps
function todayMidnightUnixTimestamp() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.getTime();
}

function yesterdayMidnightUnixTimestamp() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  return yesterday.getTime();
}

function last7DaysStartUnixTimestamp() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);
  return sevenDaysAgo.getTime();
}

function last30DaysStartUnixTimestamp() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  thirtyDaysAgo.setHours(0, 0, 0, 0);
  return thirtyDaysAgo.getTime();
}

function nowUnixTimestamp() {
  return new Date().getTime();
}

function getWeekNumber(date) {
  const currentDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(currentDate.getDate() - (currentDate.getDay() + 6) % 7);
  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  return Math.ceil(((currentDate - yearStart) / 86400000 + 1) / 7);
}

  module.exports = {
    getMailFile,cleanme,generateCode,send_message,
    generateUniqueId,response,createKey,getFullURL,todayMidnightUnixTimestamp,
    yesterdayMidnightUnixTimestamp,last30DaysStartUnixTimestamp,last7DaysStartUnixTimestamp,nowUnixTimestamp,getWeekNumber
  }
