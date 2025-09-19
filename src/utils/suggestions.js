/**
 * @fileoverview Generates personalized suggestions based on user's carbon footprint assessment
 */

export const generateSuggestions = (answers, totalScore) => {
  const suggestions = [];
  
  // Transportation suggestions (question ID: transport)
  if (parseInt(answers.transport) >= 4) { // Personal car (fuel) = 5 points
    suggestions.push({
      category: "Transportation",
      priority: "high",
      title: "Reduce Vehicle Dependency",
      description: "Your car usage significantly impacts your carbon footprint.",
      tips: [
        "Switch to public transit when possible",
        "Walk or bike for short distances",
        "Carpool to work or social events", 
        "Consider purchasing a hybrid or electric vehicle",
        "Combine multiple errands into one trip",
        "Work from home when possible to reduce commuting"
      ],
      impact: "High - Can reduce footprint by up to 4 points"
    });
  } else if (parseInt(answers.transport) === 3) { // Electric car
    suggestions.push({
      category: "Transportation", 
      priority: "medium",
      title: "Optimize Your Green Commute",
      description: "You're using an electric car - great! Here's how to do even better.",
      tips: [
        "Walk or bike when weather and distance permit",
        "Use public transportation for longer trips",
        "Ensure your electricity comes from renewable sources",
        "Encourage others to switch to electric vehicles"
      ],
      impact: "Medium - Can reduce footprint by 1-2 points"
    });
  } else if (parseInt(answers.transport) === 2) { // Public transport
    suggestions.push({
      category: "Transportation",
      priority: "low", 
      title: "Perfect Your Sustainable Commute",
      description: "You're already using public transit! Small optimizations can help even more.",
      tips: [
        "Walk or bike when weather permits",
        "Choose electric or hybrid public transport options",
        "Support local transit improvement initiatives",
        "Help others discover public transportation benefits"
      ],
      impact: "Low - Can reduce footprint by 1 point"
    });
  }

  // Diet suggestions (question ID: diet)
  if (parseInt(answers.diet) >= 4) { // Meat-heavy = 5 points
    suggestions.push({
      category: "Diet & Food",
      priority: "high",
      title: "Transition to Sustainable Eating",
      description: "Meat-heavy diets have a significant environmental impact.",
      tips: [
        "Try 'Meatless Monday' - start with one meat-free day per week",
        "Reduce portion sizes of meat in meals",
        "Choose locally-sourced and organic meat when you do eat it",
        "Explore plant-based protein alternatives like beans and lentils",
        "Try fish instead of red meat twice a week",
        "Learn delicious vegetarian recipes"
      ],
      impact: "High - Can reduce footprint by 2-4 points"
    });
  } else if (parseInt(answers.diet) === 3) { // Mixed diet
    suggestions.push({
      category: "Diet & Food",
      priority: "medium", 
      title: "Move Toward More Plant-Based Eating",
      description: "Your balanced diet is good, but increasing plants can help more.",
      tips: [
        "Increase vegetable portions in your meals",
        "Try plant-based alternatives 2-3 times per week", 
        "Choose fish over red meat when possible",
        "Buy seasonal and local produce when available"
      ],
      impact: "Medium - Can reduce footprint by 1-2 points"
    });
  }

  // Energy suggestions (question ID: energy)
  if (parseInt(answers.energy) >= 4) { // Mostly fossil fuels = 5 points
    suggestions.push({
      category: "Energy & Home",
      priority: "high",
      title: "Switch to Renewable Energy",
      description: "Fossil fuel energy significantly impacts your carbon footprint.",
      tips: [
        "Research renewable energy options in your area",
        "Consider installing solar panels if feasible",
        "Switch to a green energy provider",
        "Improve home insulation to reduce energy needs",
        "Upgrade to energy-efficient appliances",
        "Use LED bulbs throughout your home"
      ],
      impact: "High - Can reduce footprint by 2-4 points"
    });
  } else if (parseInt(answers.energy) === 3) { // Mixed energy
    suggestions.push({
      category: "Energy & Home",
      priority: "medium",
      title: "Increase Your Renewable Energy Use",
      description: "You're using some renewable energy - let's increase that percentage.",
      tips: [
        "Look into increasing your renewable energy percentage",
        "Use a programmable thermostat",
        "Unplug electronics when not in use", 
        "Air-dry clothes instead of using the dryer"
      ],
      impact: "Medium - Can reduce footprint by 1-2 points"
    });
  }

  // Shopping suggestions (question ID: shopping)
  if (parseInt(answers.shopping) >= 4) { // Fast fashion/frequent upgrades = 5 points
    suggestions.push({
      category: "Conscious Shopping",
      priority: "high",
      title: "Embrace Sustainable Shopping",
      description: "Frequent shopping for new items has a major environmental impact.",
      tips: [
        "Shop at thrift stores and consignment shops",
        "Buy refurbished electronics instead of brand new",
        "Practice the 'do I really need this?' test before purchases",
        "Choose quality items that last longer",
        "Rent or borrow items you use infrequently",
        "Support brands with strong sustainability practices"
      ],
      impact: "High - Can reduce footprint by 2-4 points"
    });
  }

  // Waste suggestions (question ID: waste)
  if (parseInt(answers.waste) >= 4) { // High waste = 5 points
    suggestions.push({
      category: "Waste Reduction",
      priority: "high", 
      title: "Minimize Your Household Waste",
      description: "High waste generation significantly impacts the environment.",
      tips: [
        "Start composting organic waste",
        "Increase recycling of paper, plastic, and metals",
        "Use reusable bags, containers, and water bottles",
        "Buy products with minimal packaging",
        "Donate or sell items instead of throwing them away",
        "Choose products that can be repaired rather than replaced"
      ],
      impact: "High - Can reduce footprint by 2-4 points"
    });
  }

  // Water usage suggestions (question ID: water)
  if (parseInt(answers.water) >= 4) { // High water usage = 5 points
    suggestions.push({
      category: "Water Conservation",
      priority: "medium",
      title: "Reduce Your Water Consumption", 
      description: "High water usage contributes to your environmental impact.",
      tips: [
        "Take shorter showers (aim for 5 minutes or less)",
        "Fix leaky faucets and pipes promptly",
        "Use efficient appliances and low-flow fixtures",
        "Collect rainwater for plants",
        "Only run dishwashers and washing machines with full loads",
        "Turn off the tap while brushing teeth"
      ],
      impact: "Medium - Can reduce footprint by 2-4 points"
    });
  }

  // Travel suggestions (question ID: travel)
  if (parseInt(answers.travel) >= 4) { // Frequent flying = 5 points
    suggestions.push({
      category: "Travel & Transportation",
      priority: "high",
      title: "Reduce Air Travel Impact",
      description: "Frequent flying has one of the highest per-activity carbon impacts.",
      tips: [
        "Choose destinations closer to home",
        "Take longer, less frequent trips instead of many short ones",
        "Consider train travel for medium-distance trips",
        "Offset your flights through verified carbon offset programs",
        "Choose direct flights when flying is necessary",
        "Explore local destinations and 'staycation' options"
      ],
      impact: "Very High - Can reduce footprint by 2-4 points"
    });
  }

  // Overall score-based suggestions
  if (totalScore >= 40) {
    suggestions.unshift({
      category: "Getting Started",
      priority: "high",
      title: "Begin Your Sustainability Journey",
      description: "Your score indicates high environmental impact, but every step toward sustainability makes a difference!",
      tips: [
        "Focus on 1-2 biggest impact areas first",
        "Set small, achievable weekly goals",
        "Track your progress and celebrate improvements",
        "Connect with others on sustainability journeys",
        "Start with the easiest changes to build momentum",
        "Remember that small actions add up to big changes"
      ],
      impact: "Foundation - Your starting point for maximum impact"
    });
  } else if (totalScore <= 15) {
    suggestions.push({
      category: "Leadership & Advocacy",
      priority: "low",
      title: "You're a Sustainability Champion!",
      description: "Your low score shows excellent environmental consciousness. Help others follow your lead!",
      tips: [
        "Share your sustainable practices with friends and family",
        "Volunteer for environmental organizations in your community",
        "Support businesses with strong sustainability commitments",
        "Consider carbon offsetting for any remaining emissions",
        "Advocate for environmental policies in your community",
        "Mentor others starting their sustainability journey"
      ],
      impact: "Leadership - Help multiply your positive impact"
    });
  }

  // Sort suggestions by priority (high first, then medium, then low)
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

// Utility function to calculate potential total score reduction
export const calculateScoreReduction = (suggestions) => {
  let totalReduction = 0;
  suggestions.forEach(suggestion => {
    const impactText = suggestion.impact;
    const pointsMatch = impactText.match(/(\d+)-?(\d+)?\s+points?/);
    if (pointsMatch) {
      const points = pointsMatch[2] ? 
        (parseInt(pointsMatch[1]) + parseInt(pointsMatch[2])) / 2 : 
        parseInt(pointsMatch[1]);
      totalReduction += points;
    }
  });
  return Math.min(totalReduction, 25); // Cap at reasonable maximum
};