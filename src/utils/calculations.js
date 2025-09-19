/**
 * @fileoverview This file contains the core logic for calculating the eco-footprint score.
 */

// Define the scoring values for each category and choice.
// These values are simple estimations for this mini-calculator.
const SCORE_VALUES = {
    transport: {
        car: 15,
        transit: 5,
        walk_bike: 0,
    },
    diet: {
        meat: 12,
        balanced: 6,
        veggie: 2,
    },
    shopping: {
        new: 10,
        mix: 5,
        eco: 2,
    },
    // Energy is a range from 2 to 10, so it's handled directly.
};

/**
 * Calculates the total eco-footprint score based on user selections.
 * @param {object} userSelections - An object containing the user's choices.
 * @param {string} userSelections.transport - The selected transport method (e.g., 'car').
 * @param {string} userSelections.diet - The selected diet type (e.g., 'meat').
 * @param {number} userSelections.energy - The selected energy consciousness level (2-10).
 * @param {string} userSelections.shopping - The selected shopping habit (e.g., 'new').
 * @returns {{totalScore: number, scores: object}} - An object containing the total score
 * and a breakdown of scores for each category.
 */
export function calculateFootprint(userSelections) {
    // Retrieve the score for each category based on the user's selection.
    const transportScore = SCORE_VALUES.transport[userSelections.transport] || 0;
    const dietScore = SCORE_VALUES.diet[userSelections.diet] || 0;
    const shoppingScore = SCORE_VALUES.shopping[userSelections.shopping] || 0;
    
    // The energy score is taken directly from the range input.
    const energyScore = parseInt(userSelections.energy, 10) || 0;

    // Sum the scores to get the final total.
    const totalScore = transportScore + dietScore + energyScore + shoppingScore;

    const scores = {
        transportScore,
        dietScore,
        energyScore,
        shoppingScore,
    };

    return { totalScore, scores };
}

/**
 * Determines the category and color for the visual feedback gauge.
 * @param {number} totalScore - The user's total calculated score.
 * @returns {{level: string, color: string, message: string}} - An object with the level,
 * tailwind css color class, and a feedback message.
 */
export function getResultCategory(totalScore) {
    // The maximum possible score is 15 + 12 + 10 + 10 = 47.
    if (totalScore <= 18) {
        return {
            level: 'low',
            color: 'bg-green-500',
            message: "Excellent! Your daily footprint is low.",
        };
    }
    if (totalScore <= 32) {
        return {
            level: 'medium',
            color: 'bg-yellow-500',
            message: "Good effort! There's some room for improvement.",
        };
    }
    return {
        level: 'high',
        color: 'bg-red-500',
        message: "Your daily footprint is high. Let's find ways to reduce it!",
    };
}