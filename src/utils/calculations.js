/**
 * @fileoverview This file contains the core logic for calculating the eco-footprint score.
 */

import { generateSuggestions } from './suggestions.js';

/**
 * Calculates the total eco-footprint score based on user selections.
 * @param {object} userSelections - An object containing the user's choices from the form.
 * @returns {{totalScore: number, scores: object, resultCategory: object, suggestions: array}} - Complete results object.
 */
export function calculateFootprint(userSelections) {
    console.log('Calculating footprint for:', userSelections);
    
    // Sum all the scores from the form (each question returns 1, 3, or 5 points)
    const totalScore = Object.values(userSelections).reduce((sum, value) => sum + (parseInt(value) || 0), 0);
    
    // Create a breakdown of scores by category for display
    const scores = {
        transportScore: parseInt(userSelections.transport) || 0,
        dietScore: parseInt(userSelections.diet) || 0,
        energyScore: parseInt(userSelections.energy) || 0,
        shoppingScore: parseInt(userSelections.shopping) || 0,
        habitsScore: parseInt(userSelections.habits) || 0,
        waterScore: parseInt(userSelections.water) || 0,
        wasteScore: parseInt(userSelections.waste) || 0,
        digitalScore: parseInt(userSelections.digital) || 0,
        travelScore: parseInt(userSelections.travel) || 0,
        appliancesScore: parseInt(userSelections.appliances) || 0
    };

    // Get the result category and message
    const resultCategory = getResultCategory(totalScore);
    
    // Generate personalized suggestions based on answers
    const suggestions = generateSuggestions(userSelections, totalScore);

    console.log('Calculation results:', { totalScore, scores, resultCategory, suggestions });

    return { 
        totalScore, 
        scores, 
        resultCategory,
        suggestions
    };
}

/**
 * Determines the category and color for the visual feedback gauge.
 * @param {number} totalScore - The user's total calculated score.
 * @returns {{level: string, color: string, message: string}} - An object with the level,
 * tailwind css color class, and a feedback message.
 */
export function getResultCategory(totalScore) {
    // With 10 questions, each worth 1-5 points, max score is 50
    if (totalScore <= 15) {
        return {
            level: 'low',
            color: 'bg-green-500',
            message: "Excellent! Your carbon footprint is very low. Keep up the great work!",
        };
    }
    if (totalScore <= 30) {
        return {
            level: 'medium',
            color: 'bg-yellow-500',
            message: "Good effort! Your footprint is moderate with room for improvement.",
        };
    }
    return {
        level: 'high',
        color: 'bg-red-500',
        message: "Your carbon footprint is high. Let's work on reducing it together!",
    };
}