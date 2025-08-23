# KARTHAVYA - Personal Fitness Tracker

*Commit. Complete. Conquer.*

A comprehensive web-based fitness tracker designed for body recomposition with a 6-day workout schedule. Built with modern web technologies and branded with the KARTHAVYA philosophy of dedication and excellence.

## Features

### 🏋️ Workout Management
- **6-Day Workout Schedule**: Chest+Cardio, Shoulders+Abs, Back+Cardio, Arms+Abs, Legs+Cardio, Full Body+Abs
- **Exercise Tracking**: Sets, reps, and weight tracking for each exercise
- **Video Placeholders**: Ready for you to add your own exercise video links
- **Progress Tracking**: Mark sets as completed and track workout progress

### ⏱️ Timer System
- **Rest Timer**: Adjustable 30-180 second rest periods between sets
- **Visual Timer**: Clean countdown display with start/pause/reset controls

### 📊 Progress Visualization
- **Dashboard Overview**: Weekly completion stats, calories burned, current streak
- **Charts**: Weekly and monthly progress visualization using Chart.js
- **Local Storage**: All progress saved locally in your browser

### 🎨 User Interface
- **KARTHAVYA Branding**: Navy blue and orange color scheme with custom logo
- **Motivational Elements**: Encouraging pop-ups and "Commit. Complete. Conquer." philosophy
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with TailwindCSS styling
- **Weight Tracking**: Editable weight with history visualization

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start tracking your workouts!

### Usage
1. **Dashboard**: View your weekly progress and today's workout
2. **Navigation**: Use the sidebar to select different workout days
3. **Workouts**: 
   - Click on exercises to mark sets as completed
   - Adjust weights as needed
   - Use the rest timer between sets
   - Add your own video links by clicking the video placeholders
4. **Progress**: Your data is automatically saved and displayed in charts

## Workout Schedule

### Equipment Used
- Dumbbells (2-15 kg range)
- Treadmill (defective incline)
- Elliptical cycle
- Skipping rope
- Yoga mat
- All-in-one machine (leg press, curls, pull-down bars)
- Gym ball

### Weekly Schedule
- **Monday**: Chest + Cardio
- **Tuesday**: Shoulders + Abs  
- **Wednesday**: Back + Cardio
- **Thursday**: Arms (Biceps + Triceps) + Abs
- **Friday**: Legs + Cardio
- **Saturday**: Full Body + Abs
- **Sunday**: Rest/Recovery

## Customization

### Adding Video Links
1. Click on any video placeholder in an exercise
2. Replace the placeholder URL with your actual video link
3. The system will remember your preferences

### Adjusting Weights
- Use the weight input field for each exercise
- Changes are automatically saved
- Starting weights are suggestions based on your profile

### Timer Settings
- Adjust rest duration using the slider (30-180 seconds)
- Timer preferences are remembered between sessions

## Data Storage

All your progress data is stored locally in your browser using localStorage:
- Workout completion status
- Weight settings
- Progress statistics
- Theme preferences

**Note**: Data is tied to your browser. Clear browser data will reset your progress.

## Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## Technical Details

### Built With
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with TailwindCSS
- **JavaScript ES6+**: Interactive functionality
- **Chart.js**: Progress visualization
- **Font Awesome**: Icons

### File Structure
```
fitness-tracker/
├── index.html          # Main application file
├── styles.css          # Custom CSS styles
├── app.js             # Main application logic
├── workout-data.js    # Workout data and structure
└── README.md          # This file
```

## Future Enhancements

Potential features for future versions:
- Cloud sync for data backup
- Nutrition tracking
- Exercise video integration
- Social sharing features
- Advanced analytics
- Workout plan customization

## Support

For issues or questions:
1. Check that JavaScript is enabled in your browser
2. Ensure you're using a supported browser version
3. Try clearing browser cache and reloading

## License

This project is open source and available under the MIT License.
