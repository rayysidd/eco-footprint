// src/utils/questions.js
const questions = [
  {
    id: "energy",
    text: "How do you power your home?",
    type: "radio",
    options: [
      { label: "Mostly renewable (solar, wind)", value: 1 },
      { label: "Mixed (renewable + fossil fuels)", value: 3 },
      { label: "Mostly fossil fuels", value: 5 }
    ]
  },
  {
    id: "transport",
    text: "How do you usually commute?",
    type: "radio",
    options: [
      { label: "Walking / Cycling", value: 1 },
      { label: "Public transport", value: 2 },
      { label: "Personal car (electric)", value: 3 },
      { label: "Personal car (fuel)", value: 5 }
    ]
  },
  {
    id: "diet",
    text: "How would you describe your diet?",
    type: "radio",
    options: [
      { label: "Vegan / Vegetarian", value: 1 },
      { label: "Mixed (some meat)", value: 3 },
      { label: "Meat-heavy", value: 5 }
    ]
  },
  {
    id: "habits",
    text: "How often do you recycle or reuse products?",
    type: "radio",
    options: [
      { label: "Always", value: 1 },
      { label: "Sometimes", value: 3 },
      { label: "Rarely", value: 5 }
    ]
  },
  {
    id: "water",
    text: "How do you manage your daily water usage?",
    type: "radio",
    options: [
      { label: "Conserve (short showers, efficient appliances)", value: 1 },
      { label: "Average (some conservation)", value: 3 },
      { label: "High (long showers, little conservation)", value: 5 }
    ]
  },
  {
    id: "shopping",
    text: "How often do you buy new clothes or gadgets?",
    type: "radio",
    options: [
      { label: "Rarely (buy second-hand / sustainable)", value: 1 },
      { label: "Occasionally (a few times a year)", value: 3 },
      { label: "Frequently (fast fashion / upgrades)", value: 5 }
    ]
  },
  {
    id: "waste",
    text: "How much household waste do you generate?",
    type: "radio",
    options: [
      { label: "Minimal (compost, recycle, low trash)", value: 1 },
      { label: "Average (some recycling, moderate trash)", value: 3 },
      { label: "High (lots of disposable waste)", value: 5 }
    ]
  },
  {
    id: "digital",
    text: "How much time do you spend on digital devices daily?",
    type: "radio",
    options: [
      { label: "Low (<3 hours)", value: 1 },
      { label: "Moderate (3–6 hours)", value: 3 },
      { label: "High (>6 hours)", value: 5 }
    ]
  },
  {
    id: "travel",
    text: "How often do you take flights in a year?",
    type: "radio",
    options: [
      { label: "None", value: 1 },
      { label: "1–2 short trips", value: 3 },
      { label: "Frequent flying (3+ trips)", value: 5 }
    ]
  },
  {
    id: "appliances",
    text: "Do you turn off appliances when not in use?",
    type: "radio",
    options: [
      { label: "Always (energy conscious)", value: 1 },
      { label: "Sometimes", value: 3 },
      { label: "Rarely", value: 5 }
    ]
  }
];

export default questions;
