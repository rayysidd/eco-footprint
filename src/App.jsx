import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';

// --- UTILITY DATA & FUNCTIONS ---
// In a real multi-file app, these would be in separate 'utils/' files.

const questions = [
  { id: 'energy', text: 'How do you primarily heat your home?', type: 'radio', options: [{ label: 'Renewable Energy (Solar, Geothermal)', value: 1 },{ label: 'Natural Gas or Electricity', value: 3 },{ label: 'Heating Oil or Coal', value: 5 }] },
  { id: 'appliances', text: 'How energy-efficient are your home appliances?', type: 'radio', options: [{ label: 'Mostly new, high-efficiency models', value: 1 },{ label: 'A mix of old and new', value: 3 },{ label: 'Mostly older, less efficient models', value: 5 }] },
  { id: 'transport', text: 'What is your primary mode of daily transport?', type: 'radio', options: [{ label: 'Walking or Biking', value: 0 },{ label: 'Public Transport', value: 2 },{ label: 'Electric Vehicle', value: 3 },{ label: 'Gasoline Car (alone)', value: 5 }] },
  { id: 'travel', text: 'How many round-trip flights do you take per year?', type: 'radio', options: [{ label: 'None', value: 0 },{ label: '1-2 short-haul flights', value: 3 },{ label: 'Multiple long-haul flights', value: 5 }] },
  { id: 'diet', text: 'How would you describe your diet?', type: 'radio', options: [{ label: 'Vegan or Vegetarian', value: 2 },{ label: 'Balanced diet with some meat', value: 4 },{ label: 'Meat-heavy diet', value: 6 }] },
  { id: 'habits', text: 'Do you actively recycle and compost?', type: 'radio', options: [{ label: 'Yes, always', value: 1 },{ label: 'Sometimes, when convenient', value: 3 },{ label: 'No, not really', value: 5 }] },
  { id: 'water', text: 'How conscious are you of your water usage?', type: 'radio', options: [{ label: 'Very conscious (short showers, fix leaks)', value: 1 },{ label: 'Somewhat conscious', value: 2 },{ label: 'Not very conscious', value: 4 }] },
  { id: 'shopping', text: 'How often do you buy new items (clothing, electronics)?', type: 'radio', options: [{ label: 'Rarely, I prefer secondhand or repair', value: 1 },{ label: 'Occasionally, when I need something', value: 3 },{ label: 'Frequently, I enjoy new things', value: 5 }] },
  { id: 'waste', text: 'How much non-recyclable waste do you produce?', type: 'radio', options: [{ label: 'Very little, I avoid single-use plastics', value: 1 },{ label: 'An average amount', value: 3 },{ label: 'A significant amount', value: 5 }] },
  { id: 'digital', text: 'How mindful are you of your digital footprint (e.g., streaming, cloud storage)?', type: 'radio', options: [{ label: 'Very mindful, I limit streaming and data', value: 1 },{ label: 'Somewhat mindful', value: 2 },{ label: 'Not really, I use it as needed', value: 4 }] }
];

const SCORE_VALUES = {
  transport: { 0: 0, 2: 2, 3: 3, 5: 5 }, diet: { 2: 2, 4: 4, 6: 6 }, energy: { 1: 1, 3: 3, 5: 5 }, appliances: { 1: 1, 3: 3, 5: 5 },
  travel: { 0: 0, 3: 3, 5: 5 }, habits: { 1: 1, 3: 3, 5: 5 }, water: { 1: 1, 2: 2, 4: 4 }, shopping: { 1: 1, 3: 3, 5: 5 },
  waste: { 1: 1, 3: 3, 5: 5 }, digital: { 1: 1, 2: 2, 4: 4 }
};

const MAX_SCORE = Object.values(SCORE_VALUES).reduce((sum, category) => sum + Math.max(...Object.values(category)), 0);

const calculateFootprint = (answers) => {
  let scores = {}; let totalScore = 0;
  for (const q of questions) {
    const value = answers[q.id];
    const score = SCORE_VALUES[q.id]?.[value] || 0;
    scores[`${q.id}Score`] = score;
    totalScore += score;
  }
  return { totalScore, scores };
};

const getResultCategory = (totalScore) => {
  if (totalScore <= 18) return { level: 'low', message: 'Great job! Your habits have a low impact on the environment.', textColor: 'text-green-600' };
  if (totalScore <= 35) return { level: 'medium', message: 'You\'re making good choices, but there are areas for improvement.', textColor: 'text-yellow-600' };
  return { level: 'high', message: 'Your footprint is high, but small changes can make a big difference.', textColor: 'text-red-600' };
};

const generateSuggestions = (scores, totalScore) => {
    const suggestions = [];
    if (scores.transportScore > 3) suggestions.push({ priority: 'high', category: 'Transportation', title: 'Rethink Your Ride', description: 'Your daily commute is a major contributor to your carbon footprint.', tips: ['Try public transport, cycling, or carpooling one day a week.', 'Combine errands into a single trip to reduce driving.'], impact: 'High potential for CO2 reduction.' });
    if (scores.dietScore > 4) suggestions.push({ priority: 'high', category: 'Diet', title: 'Eat Greener', description: 'Meat production has a significant environmental impact.', tips: ['Introduce a "Meatless Monday" into your weekly routine.', 'Explore plant-based proteins like lentils and beans.'], impact: 'Reduces methane and water usage.' });
    if (scores.travelScore > 3) suggestions.push({ priority: 'medium', category: 'Travel', title: 'Fly Smarter', description: 'Air travel is highly carbon-intensive.', tips: ['Opt for direct flights when possible.', 'Consider train travel for shorter distances.'], impact: 'Significantly lowers personal emissions.' });
    if (scores.energyScore > 3) suggestions.push({ priority: 'medium', category: 'Energy', title: 'Power Down', description: 'Heating and cooling are energy hogs.', tips: ['Lower your thermostat by a degree or two in winter.', 'Use fans and open windows before turning on the A/C.'], impact: 'Lowers utility bills and emissions.' });
    if (scores.shoppingScore > 3) suggestions.push({ priority: 'low', category: 'Shopping', title: 'Shop Consciously', description: 'Fast fashion and frequent electronics upgrades create waste.', tips: ['Explore thrift stores for unique finds.', 'Learn basic repair skills for clothing and electronics.'], impact: 'Reduces landfill waste and manufacturing demand.' });

    if (suggestions.length === 0 && totalScore <= 18) {
      suggestions.push({ priority: 'low', category: 'Leadership', title: 'You\'re an Eco-Leader!', description: 'Your footprint is impressively low! Now you can inspire others.', tips: ['Share your green habits with friends and family.', 'Advocate for sustainable practices in your community or workplace.'], impact: 'Your influence can multiply your positive impact.' });
    } else if (suggestions.length === 0) {
       suggestions.push({ priority: 'medium', category: 'Getting Started', title: 'Start Your Green Journey', description: 'You have a balanced footprint. Here are some easy first steps.', tips: ['Switch to reusable water bottles and coffee cups.', 'Unplug electronics when they are not in use.'], impact: 'Small habits create a big collective impact.' });
    }
    return suggestions;
};


// --- SVG ICONS ---
const FaIcon = ({ path, className="w-6 h-6" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} fill="currentColor"><path d={path} /></svg>;
const CheckIcon = () => <FaIcon className="text-white text-xs" path="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>;
const QuestionIcon = () => <FaIcon className="text-gray-600 text-sm" path="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-2 1.2-2.5 3.9-1.2 5.9l40.7 62.5c1.2 1.9 3.9 2.5 5.9 1.2l62.5-40.7c1.9-1.2 2.5-3.9 1.2-5.9zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
const HomeIcon = () => <FaIcon className="text-white text-lg" path="m21.15,223.85l189.6,189.6c1.2,1.2 2.8,1.85 4.5,1.85s3.3,-0.65 4.5,-1.85l189.6,-189.6c2.5,-2.5 2.5,-6.55 0,-9.05l-22.6,-22.6c-2.5,-2.5 -6.55,-2.5 -9.05,0l-39.6,39.6V88c0,-3.55 -2.9,-6.45 -6.45,-6.45h-64c-3.55,0 -6.45,2.9 -6.45,6.45v68.45l-44.15,-44.15c-2.5,-2.5 -6.55,-2.5 -9.05,0l-167,167c-2.5,2.5 -2.5,6.55 0,9.05z"/>
const CarIcon = () => <FaIcon className="text-white text-lg" path="M128 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 0a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM32 256c0-49.9 23.4-94.2 60.1-124.2C118.4 104.1 158.8 80 208 80H304c49.2 0 89.6 24.1 115.9 51.8C456.6 161.8 480 206.1 480 256v42.5c0 8.6-3.4 16.7-9.4 22.6l-33.4 33.4c-13.5 13.5-35.4 13.5-48.9 0L355 321.3c-9.4-9.4-24.6-9.4-33.9 0l-33.9 33.9c-9.4 9.4-9.4 24.6 0 33.9l33.4 33.4c13.5 13.5 13.5 35.4 0 48.9L280.7 480H231.3l-33.4-33.4c-13.5-13.5-35.4-13.5-48.9 0L115.6 480H64.9L32 447.1V256zM144 208a16 16 0 1 0 0-32 16 16 0 1 0 0 32zm192 0a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/>;
const UtensilsIcon = () => <FaIcon className="text-white text-lg" path="M192 0c-17.7 0-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h96v256c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V224h96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H288V32c0-17.7-14.3-32-32-32H192zM96 160H64V128h32v32z"/>;
const ShoppingCartIcon = () => <FaIcon className="text-white text-lg" path="M128 0c-17.7 0-32 14.3-32 32V64H48c-17.7 0-32 14.3-32 32v48h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H16v48c0 17.7 14.3 32 32 32H192c0-26.5-21.5-48-48-48s-48 21.5-48 48H416c17.7 0 32-14.3 32-32V320h48c26.5 0 48-21.5 48-48s-21.5-48-48-48h-48V160h16c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32H352V32c0-17.7-14.3-32-32-32H128z"/>;
const LeafIcon = () => <FaIcon className="text-white text-2xl" path="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM153 160.1c-13.2-12.8-34.3-12.5-47.1 .7l-41.2 42.1c-13.4 13.7-13.8 35.7-.9 49.8L224.2 416l21.3-21.3c21.2-21.2 21.2-55.7 0-76.9L153 225.4V160.1zM288 320l-42.7 42.7c-21.2 21.2-55.7 21.2-76.9 0L76 270.2c-13-13.3-13.3-34.1-.7-47.5l42.1-41.2c13.2-12.8 34.3-12.5 47.1 .7L225.4 274.7c21.2 21.2 55.7 21.2 76.9 0L424 153.3c13-13.3 34.1-13.3 47.1 0l41.2 42.1c13.4 13.7 13.8 35.7 .9 49.8L288 416v-96z"/>;
const CalculatorIcon = () => <FaIcon className="text-lg" path="M192 32c0-17.7-14.3-32-32-32S128 14.3 128 32V48H64c-17.7 0-32 14.3-32 32s14.3 32 32 32H80v32c0 17.7 14.3 32 32 32h16c17.7 0 32-14.3 32-32V112h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H192V32zm-64 80v32h64V112H128zM32 256c-17.7 0-32 14.3-32 32v16c0 35.3 28.7 64 64 64H320v48c0 17.7 14.3 32 32 32s32-14.3 32-32V416h48c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V304c0-35.3-28.7-64-64-64H64V288h16c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zm64 80H64v16h32V336z"/>;
const RedoIcon = () => <FaIcon className="text-lg" path="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />;
const SaveIcon = () => <FaIcon className="text-lg" path="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64s28.654-64 64-64s64 28.654 64 64s-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A12 12 0 0 1 320 111.48z" />;
const ShareIcon = () => <FaIcon className="text-lg" path="M352 320c-22.9 0-43.4 7.6-60.3 20.2L160.2 272.1c.1-.8.2-1.7.2-2.5s-.1-1.7-.2-2.5L291.7 200c16.9 12.6 37.4 20.2 60.3 20.2 53 0 96-43 96-96s-43-96-96-96-96 43-96 96c0 .8.1 1.7.2 2.5L120.3 96.9C103.4 84.3 82.9 76.8 60.2 76.8 26.9 76.8 0 106.8 0 144s26.9 67.2 60.2 67.2c22.7 0 43.2-7.5 60-20.1l131.5 69.1c-.1.8-.2 1.7-.2 2.6s.1 1.8.2 2.6L120.3 415c-16.8-12.6-37.3-20.1-60-20.1-33.3 0-60.2 30-60.2 67.2s26.9 67.2 60.2 67.2 60.2-30 60.2-67.2c0-.9-.1-1.8-.2-2.6l131.5-69.1c16.8 12.6 37.3 20.1 60.3 20.1 53 0 96-43 96-96s-43-96-96-96z" />;
const BoltIcon = () => <FaIcon className="text-gray-500" path="M315.4 2.4c-3.3-3.2-8.5-3.2-11.8 0L137 168.6c-4.3 4.2-2.1 11.8 3.2 13.5l88.5 28.5-62.6 156.4c-4.2 10.5 2.1 22.5 13.5 24.3l154.5 24.5c6.5 1 12.5-2.8 15.6-8.5L403 230.6c4.2-7.8-1.5-17.1-10.4-18.8l-99.3-19.8 119.5-180c4.3-6.5-.1-15.3-7.9-17.2L315.4 2.4z" />;
const RecycleIcon = () => <FaIcon className="text-gray-500" path="M310.4 39.8c-7.5-6.6-18.6-6.3-25.7 .8L118 214.3l-59-39.3c-8.5-5.7-19.8-4-26.6 4.3L15 198.5c-6.8 8.3-5.2 20.5 3.5 26.6l96.7 64.5c8.5 5.7 19.8 4 26.6-4.3l175.2-262.8c6.8-8.3 5.2-20.5-3.5-26.6zM496 222.1V448c0 17.7-14.3 32-32 32H176c-17.7 0-32-14.3-32-32V309.9l-19.1 28.6c-7.1 10.7-19.5 16.6-32.3 16.6C80.2 355.1 69 349 61.2 339l-45.2-58.4c-7.8-10.1-6.1-24.1 3.7-32.2L128.9 144H288c17.7 0 32-14.3 32-32s-14.3-32-32-32H128.9l12.9-19.3c7.1-10.7 19.5-16.6 32.3-16.6c12.3 0 23.5 5.9 31.3 15.9l45.2 58.4c7.8 10.1 6.1 24.1-3.7 32.2L144 245.9V320h288V177.9l19.1-28.6c7.1-10.7 19.5-16.6 32.3-16.6c12.3 0 23.5 5.9 31.3 15.9l45.2 58.4c7.8 10.1 6.1 24.1-3.7 32.2L496 222.1z" />;
const WaterIcon = () => <FaIcon className="text-gray-500" path="M288 0c-44.2 0-80 35.8-80 80c0 13.7 3.4 26.5 9.5 37.9L160 175.1V480c0 17.7 14.3 32 32 32s32-14.3 32-32V384h32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V128.9C362.5 128.9 368 123.6 368 117.1c0-11.3-9.1-20.4-20.4-20.4H336c0-44.2-35.8-80-80-80zm0 32a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />;
const TrashIcon = () => <FaIcon className="text-gray-500" path="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.9 23.9 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32l21.2 339z" />;
const DesktopIcon = () => <FaIcon className="text-gray-500" path="M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192v40H160c-17.7 0-32 14.3-32 32s14.3 32 32 32h256c17.7 0 32-14.3 32-32s-14.3-32-32-32H336v-40h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z" />;
const PlaneIcon = () => <FaIcon className="text-gray-500" path="M472 320H48.2c-29.3 0-48.2-35.8-31.9-58.8L128 141.2V32c0-17.7 14.3-32 32-32s32 14.3 32 32v109.2l111.7-120c16.3-23 44.5-23 60.8 0L499.7 261.2c16.3 23-2.6 58.8-31.9 58.8zM256 384c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32s32-14.3 32-32v-64c0-17.7-14.3-32-32-32z" />;
const PowerOffIcon = () => <FaIcon className="text-gray-500" path="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM224 48v128c0 17.7 14.3 32 32 32s32-14.3 32-32V48c0-17.7-14.3-32-32-32s-32 14.3-32 32zm80 232c-20.9 20.9-49.3 34.6-80 39.3V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V319.3c-30.7-4.7-59.1-18.4-80-39.3c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c32.4 32.4 81.3 32.4 113.7 0c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z" />;


// --- UI COMPONENTS ---

const Card = ({ children, className }) => (
  <motion.div
    className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);
const CardContent = ({ children, className }) => <div className={`p-8 ${className}`}>{children}</div>;
const CardFooter = ({ children, className }) => <div className={`bg-gray-50 px-8 py-4 border-t border-gray-100 ${className}`}>{children}</div>;

const Button = ({ children, onClick, variant = 'primary', icon: Icon, className = '' }) => {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl focus:ring-green-300',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300',
  };
  return (
    <motion.button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl shadow-md transition-all duration-300 transform focus:outline-none focus:ring-4 ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {Icon && <Icon />}
      <span>{children}</span>
    </motion.button>
  );
};

const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        />
    </div>
);

const ScoreGauge = ({ score, maxScore }) => {
    const percentage = (score / maxScore) * 100;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;
    const color = percentage <= 33 ? '#22c55e' : percentage <= 66 ? '#f59e0b' : '#ef4444';

    return (
        <div className="relative flex items-center justify-center w-48 h-48 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="transparent" />
                <motion.circle
                    cx="50" cy="50" r="45" stroke={color} strokeWidth="10" fill="transparent"
                    strokeLinecap="round" transform="rotate(-90 50 50)" strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <motion.span className="text-5xl font-bold text-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>{score}</motion.span>
                <span className="text-lg text-gray-500">/ {maxScore}</span>
            </div>
        </div>
    );
};

const ScoreBreakdown = ({ scores }) => {
    const categoryDetails = {
      transportScore: { label: 'Transportation', icon: CarIcon }, dietScore: { label: 'Diet', icon: UtensilsIcon }, energyScore: { label: 'Energy', icon: BoltIcon },
      shoppingScore: { label: 'Shopping', icon: ShoppingCartIcon }, habitsScore: { label: 'Recycling', icon: RecycleIcon }, waterScore: { label: 'Water Usage', icon: WaterIcon },
      wasteScore: { label: 'Waste', icon: TrashIcon }, digitalScore: { label: 'Digital', icon: DesktopIcon }, travelScore: { label: 'Air Travel', icon: PlaneIcon },
      appliancesScore: { label: 'Appliances', icon: PowerOffIcon }
    };
    const maxCategoryScore = 6; // Max possible score for any single category is ~6

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 text-center">Detailed Score Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(scores).map(([key, score], index) => {
                    const { label, icon: Icon } = categoryDetails[key] || { label: key };
                    const percentage = (score / maxCategoryScore) * 100;
                    const getColor = (s) => s <= 2 ? 'bg-green-500' : s <= 4 ? 'bg-yellow-500' : 'bg-red-500';
                    return (
                        <motion.div key={key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-2">
                                    {Icon && <Icon />}
                                    <span className="font-medium text-gray-700">{label}</span>
                                </div>
                                <span className="font-bold text-gray-800">{score}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2"><motion.div className={`h-2 rounded-full ${getColor(score)}`} initial={{ width: 0 }} animate={{ width: `${percentage}%` }}/></div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};


// --- PAGE COMPONENTS ---

const Question = ({ question, value, onChange }) => (
  <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"><QuestionIcon /></div>
      <h3 className="font-semibold text-gray-800 text-lg leading-relaxed">{question.text}</h3>
    </div>
    <div className="ml-11 space-y-3">
      {question.options.map((opt, index) => {
        const isSelected = String(value) === String(opt.value);
        return (
          <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }} whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.98 }}>
            <label className={`relative flex items-center p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 group ${isSelected ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-md" : "bg-gray-50 border-gray-200 hover:border-green-300 hover:bg-green-50/50"}`}>
              <input type={question.type} name={question.id} value={opt.value} checked={isSelected} onChange={(e) => onChange(question.id, e.target.value)} className="sr-only" />
              <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${isSelected ? "border-green-500 bg-green-500" : "border-gray-300 group-hover:border-green-400"} flex items-center justify-center`}>
                {isSelected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckIcon /></motion.div>}
              </div>
              <span className={`ml-4 text-gray-700 font-medium ${isSelected ? "text-gray-800" : "group-hover:text-gray-800"}`}>{opt.label}</span>
            </label>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

const QuestionGroup = ({ title, questions, answers, onChange }) => {
  const IconComponent = { "Energy & Home": HomeIcon, "Transport & Travel": CarIcon, "Food & Habits": UtensilsIcon, "Shopping & Waste": ShoppingCartIcon }[title] || LeafIcon;
  const gradientColor = { "Energy & Home": "from-blue-500 to-cyan-500", "Transport & Travel": "from-purple-500 to-pink-500", "Food & Habits": "from-orange-500 to-red-500", "Shopping & Waste": "from-green-500 to-emerald-500" }[title] || "from-gray-500 to-gray-600";
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className={`bg-gradient-to-r ${gradientColor} px-6 py-4`}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"><IconComponent /></div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {questions.map((q) => <Question key={q.id} question={q} value={answers[q.id]} onChange={onChange} />)}
      </div>
    </div>
  );
};

const HomePage = ({ onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const groupedQuestions = { "Energy & Home": ["energy", "appliances"], "Transport & Travel": ["transport", "travel"], "Food & Habits": ["diet", "habits", "water"], "Shopping & Waste": ["shopping", "waste", "digital"] };
  
  const handleChange = (questionId, value) => setAnswers(prev => ({ ...prev, [questionId]: Number(value) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions 🙂");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const { totalScore, scores } = calculateFootprint(answers);
      const resultCategory = getResultCategory(totalScore);
      const suggestions = generateSuggestions(scores, totalScore);
      onComplete({ totalScore, scores, resultCategory, suggestions });
      // No need to set isSubmitting back to false, as the component will unmount
    }, 1000);
  };

  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-4 shadow-lg"><LeafIcon /></div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Carbon Footprint Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Discover your environmental impact and learn how to make a positive difference.</p>
      </div>
      <div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-gray-700">Progress</span><span className="text-sm font-medium text-green-600">{Math.round(progress)}%</span></div>
      <ProgressBar progress={progress} />
      <form onSubmit={handleSubmit} className="space-y-8 mt-8">
        {Object.entries(groupedQuestions).map(([groupTitle, ids]) => (
          <QuestionGroup key={groupTitle} title={groupTitle} questions={questions.filter(q => ids.includes(q.id))} answers={answers} onChange={handleChange} />
        ))}
        <div className="flex justify-center">
            <Button type="submit" disabled={isSubmitting} icon={isSubmitting ? undefined : CalculatorIcon}>
                {isSubmitting ? 'Calculating...' : 'Calculate My Footprint'}
            </Button>
        </div>
      </form>
    </motion.div>
  );
};

const ResultsPage = ({ results, onRestart }) => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Eco-Footprint Assessment</h1>
                <p className="text-gray-600">Here's the complete analysis of your environmental impact.</p>
            </div>

            <Card>
                <CardContent>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Your Total Score</h2>
                        <ScoreGauge score={results.totalScore} maxScore={MAX_SCORE} />
                        <div className={`text-xl font-semibold mt-4 mb-2 ${results.resultCategory.textColor}`}>{results.resultCategory.level.toUpperCase()} IMPACT</div>
                        <p className="text-gray-600 text-lg max-w-md mx-auto">{results.resultCategory.message}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <ScoreBreakdown scores={results.scores} />
                </CardFooter>
            </Card>

            <Card>
                <CardContent>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">Your Personalized Action Plan</h3>
                     <div className="space-y-4">
                        {results.suggestions.map((suggestion, index) => (
                            <div key={index} className={`p-4 rounded-lg border-l-4 ${suggestion.priority === 'high' ? 'border-red-500 bg-red-50' : suggestion.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' : 'border-green-500 bg-green-50'}`}>
                                <h4 className="font-bold text-lg">{suggestion.title}</h4>
                                <p className="text-gray-700 mt-1">{suggestion.description}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="text-center">
                <div className="flex justify-center gap-4 flex-wrap">
                    <Button onClick={onRestart} variant="secondary" icon={RedoIcon}>Take Again</Button>
                    <Button onClick={() => window.print()} icon={SaveIcon}>Save Results</Button>
                    <Button 
                        onClick={() => {
                            const shareText = `I just completed a carbon footprint assessment and got a score of ${results.totalScore}/${MAX_SCORE} (${results.resultCategory.level} impact)!`;
                            if (navigator.share) {
                                navigator.share({ title: 'My Eco-Footprint', text: shareText, url: window.location.href });
                            } else {
                                navigator.clipboard.writeText(shareText).then(() => alert('Results copied to clipboard!'));
                            }
                        }}
                        icon={ShareIcon}
                        className="from-purple-500 to-indigo-500 focus:ring-purple-300"
                    >
                        Share
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [results, setResults] = useState(null);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <AnimatePresence mode="wait">
        {results ? (
          <ResultsPage key="results" results={results} onRestart={() => setResults(null)} />
        ) : (
          <HomePage key="form" onComplete={setResults} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

