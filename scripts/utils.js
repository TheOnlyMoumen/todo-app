"use strict";

export function getFormattedDate(timestamp) {
  const date = new Date(timestamp);
  
  const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];
  
  const days = [
    "Sun", "Mon", "Tue", "Wed", 
    "Thu", "Fri", "Sat"
  ];

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const weekDay = days[date.getDay()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}, ${month} ${day}, ${year} ${hours}:${minutes}`;
}
