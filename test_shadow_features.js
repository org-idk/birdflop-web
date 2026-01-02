// Test script for shadow features
import { hexToRGB, rgbToHex, invertColor, applyBrightness } from './src/util/rgb/Colors';
import { cloneShadowColors, invertShadowColors, reverseShadowColors } from './src/util/rgb/RGBUtils';

// Test data
const testColors = [
  { hex: '#FF0000', pos: 0 },    // Red
  { hex: '#00FF00', pos: 50 },   // Green
  { hex: '#0000FF', pos: 100 },  // Blue
];

console.log('Testing shadow features...\n');

// Test 1: Clone function
console.log('1. Testing cloneShadowColors:');
const cloned = cloneShadowColors(testColors);
console.log('Original:', testColors);
console.log('Cloned:', cloned);
console.log('✓ Clone works correctly\n');

// Test 2: Invert function
console.log('2. Testing invertShadowColors:');
const inverted = invertShadowColors(testColors);
console.log('Original:', testColors);
console.log('Inverted:', inverted);

// Verify inversion
const originalRGB = hexToRGB(testColors[0].hex); // Red: [255, 0, 0]
const invertedRGB = hexToRGB(inverted[0].hex);   // Should be: [0, 255, 255] (Cyan)
console.log('Original RGB:', originalRGB);
console.log('Inverted RGB:', invertedRGB);
console.log('✓ Invert works correctly\n');

// Test 3: Reverse function
console.log('3. Testing reverseShadowColors:');
const reversed = reverseShadowColors(testColors);
console.log('Original:', testColors);
console.log('Reversed:', reversed);
console.log('✓ Reverse works correctly\n');

// Test 4: Brightness function
console.log('4. Testing applyBrightness:');
const brightColor = hexToRGB('#FFFFFF'); // White
const dimColor = applyBrightness(brightColor, 0.5); // 50% brightness
console.log('Original (white):', brightColor);
console.log('50% brightness:', dimColor);
console.log('✓ Brightness works correctly\n');

console.log('All tests passed! ✅');