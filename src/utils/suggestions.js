/**
 * @fileoverview This file contains logic for generating personalized improvement tips.
 */

// A collection of tips mapped to different categories.
const TIPS_DATABASE = {
    transport: "Consider carpooling, using public transit, or biking for short trips to significantly cut down on emissions.",
    diet: "Try incorporating one or two plant-based meal days a week. Reducing red meat consumption has a big impact.",
    energy: "Unplug electronics when not in use and switch to LED bulbs. Small changes in energy habits add up!",
    shopping: "Explore local markets and secondhand shops. You'll find unique items while reducing your consumption footprint.",
    default: "You're doing great! Keep inspiring others with your eco-conscious choices."
};

/**
 * Generates a list of personalized improvement tips based on the user's scores.
 * @param {object} scores - An object containing the score for each category.
 * @param {number} scores.transportScore - The score for transportation.
 * @param {number} scores.dietScore - The score for diet.
 * @param {number} scores.energyScore - The score for energy usage.
 * @param {number} scores.shoppingScore - The score for shopping habits.
 * @returns {string[]} - An array of relevant tip strings.
 */
export function generateSuggestions(scores) {
    const suggestions = [];

    // Add tips for categories where the score indicates room for improvement.
    // The thresholds (e.g., > 5) can be adjusted to make tips more or less sensitive.
    if (scores.transportScore > 5) {
        suggestions.push(TIPS_DATABASE.transport);
    }

    if (scores.dietScore > 6) {
        suggestions.push(TIPS_DATABASE.diet);
    }

    if (scores.energyScore > 6) {
        suggestions.push(TIPS_DATABASE.energy);
    }

    if (scores.shoppingScore > 5) {
        suggestions.push(TIPS_DATABASE.shopping);
    }

    // If the user's score is low across all categories, provide a positive reinforcement message.
    if (suggestions.length === 0) {
        suggestions.push(TIPS_DATABASE.default);
    }

    return suggestions;
}
