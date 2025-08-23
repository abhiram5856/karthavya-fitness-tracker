// Workout data structure for the 6-day fitness program
const workoutData = {
    day1: {
        name: "Chest + Cardio",
        icon: "fas fa-heart",
        exercises: [
            {
                id: "chest1",
                name: "Dumbbell Bench Press",
                sets: 3,
                reps: "8-12",
                weight: 10,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/dumbbell-bench-press",
                instructions: "Lie on bench, press dumbbells up from chest level"
            },
            {
                id: "chest2",
                name: "Dumbbell Flyes",
                sets: 3,
                reps: "10-15",
                weight: 8,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/dumbbell-flyes",
                instructions: "Lie on bench, open arms wide and bring dumbbells together"
            },
            {
                id: "chest3",
                name: "Push-ups",
                sets: 3,
                reps: "10-20",
                weight: 0,
                equipment: "Bodyweight",
                videoPlaceholder: "https://example.com/push-ups",
                instructions: "Standard push-up form, modify as needed"
            },
            {
                id: "chest4",
                name: "Dumbbell Pullovers",
                sets: 3,
                reps: "8-12",
                weight: 12,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/dumbbell-pullovers",
                instructions: "Lie on bench, lower dumbbell behind head"
            },
            {
                id: "cardio1",
                name: "Treadmill Walk/Jog",
                sets: 1,
                reps: "20 min",
                weight: 0,
                equipment: "Treadmill",
                videoPlaceholder: "https://example.com/treadmill-cardio",
                instructions: "Moderate pace, adjust speed as needed"
            },
            {
                id: "cardio2",
                name: "Elliptical",
                sets: 1,
                reps: "15 min",
                weight: 0,
                equipment: "Elliptical",
                videoPlaceholder: "https://example.com/elliptical-cardio",
                instructions: "Steady rhythm, moderate resistance"
            }
        ]
    },
    day2: {
        name: "Shoulders + Abs",
        icon: "fas fa-user",
        exercises: [
            {
                id: "shoulder1",
                name: "Dumbbell Shoulder Press",
                sets: 3,
                reps: "8-12",
                weight: 8,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/shoulder-press",
                instructions: "Press dumbbells overhead from shoulder height"
            },
            {
                id: "shoulder2",
                name: "Lateral Raises",
                sets: 3,
                reps: "12-15",
                weight: 5,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/lateral-raises",
                instructions: "Raise arms to sides until parallel to floor"
            },
            {
                id: "shoulder3",
                name: "Front Raises",
                sets: 3,
                reps: "12-15",
                weight: 5,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/front-raises",
                instructions: "Raise arms forward until parallel to floor"
            },
            {
                id: "shoulder4",
                name: "Bent-Over Reverse Flyes",
                sets: 3,
                reps: "12-15",
                weight: 5,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/reverse-flyes",
                instructions: "Bend over, raise arms to sides squeezing shoulder blades"
            },
            {
                id: "abs1",
                name: "Crunches",
                sets: 3,
                reps: "15-25",
                weight: 0,
                equipment: "Yoga Mat",
                videoPlaceholder: "https://example.com/crunches",
                instructions: "Lie on back, crunch up engaging core"
            },
            {
                id: "abs2",
                name: "Plank",
                sets: 3,
                reps: "30-60 sec",
                weight: 0,
                equipment: "Yoga Mat",
                videoPlaceholder: "https://example.com/plank",
                instructions: "Hold plank position, keep body straight"
            },
            {
                id: "abs3",
                name: "Russian Twists",
                sets: 3,
                reps: "20-30",
                weight: 0,
                equipment: "Yoga Mat",
                videoPlaceholder: "https://example.com/russian-twists",
                instructions: "Sit up, lean back, twist side to side"
            }
        ]
    },
    day3: {
        name: "Back + Cardio",
        icon: "fas fa-shield-alt",
        exercises: [
            {
                id: "back1",
                name: "Dumbbell Rows",
                sets: 3,
                reps: "8-12",
                weight: 12,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/dumbbell-rows",
                instructions: "Bend over, pull dumbbells to chest"
            },
            {
                id: "back2",
                name: "Pull-downs (Machine)",
                sets: 3,
                reps: "8-12",
                weight: 40,
                equipment: "All-in-one Machine",
                videoPlaceholder: "https://example.com/pulldowns",
                instructions: "Pull bar down to chest, squeeze shoulder blades"
            },
            {
                id: "back3",
                name: "Dumbbell Deadlifts",
                sets: 3,
                reps: "8-12",
                weight: 15,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/dumbbell-deadlifts",
                instructions: "Hinge at hips, lower dumbbells, return to standing"
            },
            {
                id: "back4",
                name: "Dumbbell Shrugs",
                sets: 3,
                reps: "12-15",
                weight: 15,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/shrugs",
                instructions: "Lift shoulders up, squeeze traps"
            },
            {
                id: "cardio3",
                name: "Elliptical",
                sets: 1,
                reps: "20 min",
                weight: 0,
                equipment: "Elliptical",
                videoPlaceholder: "https://example.com/elliptical-cardio",
                instructions: "Moderate to high intensity"
            },
            {
                id: "cardio4",
                name: "Jump Rope",
                sets: 3,
                reps: "2 min",
                weight: 0,
                equipment: "Skipping Rope",
                videoPlaceholder: "https://example.com/jump-rope",
                instructions: "Steady rhythm, rest 1 min between sets"
            }
        ]
    },
    day4: {
        name: "Arms (Biceps + Triceps) + Abs",
        icon: "fas fa-fist-raised",
        exercises: [
            {
                id: "bicep1",
                name: "Dumbbell Bicep Curls",
                sets: 3,
                reps: "10-15",
                weight: 10,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/bicep-curls",
                instructions: "Curl dumbbells up, squeeze biceps"
            },
            {
                id: "bicep2",
                name: "Hammer Curls",
                sets: 3,
                reps: "10-15",
                weight: 10,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/hammer-curls",
                instructions: "Curl with neutral grip, thumbs up"
            },
            {
                id: "tricep1",
                name: "Dumbbell Overhead Press",
                sets: 3,
                reps: "10-15",
                weight: 8,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/overhead-tricep",
                instructions: "Lower dumbbell behind head, press up"
            },
            {
                id: "tricep2",
                name: "Dumbbell Kickbacks",
                sets: 3,
                reps: "10-15",
                weight: 5,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/tricep-kickbacks",
                instructions: "Bend over, extend arms back"
            },
            {
                id: "tricep3",
                name: "Close-Grip Push-ups",
                sets: 3,
                reps: "8-15",
                weight: 0,
                equipment: "Bodyweight",
                videoPlaceholder: "https://example.com/close-grip-pushups",
                instructions: "Push-ups with hands close together"
            },
            {
                id: "abs4",
                name: "Bicycle Crunches",
                sets: 3,
                reps: "20-30",
                weight: 0,
                equipment: "Yoga Mat",
                videoPlaceholder: "https://example.com/bicycle-crunches",
                instructions: "Alternate elbow to opposite knee"
            },
            {
                id: "abs5",
                name: "Mountain Climbers",
                sets: 3,
                reps: "20-30",
                weight: 0,
                equipment: "Yoga Mat",
                videoPlaceholder: "https://example.com/mountain-climbers",
                instructions: "Alternate bringing knees to chest"
            }
        ]
    },
    day5: {
        name: "Legs + Cardio",
        icon: "fas fa-running",
        exercises: [
            {
                id: "legs1",
                name: "Dumbbell Squats",
                sets: 3,
                reps: "12-20",
                weight: 15,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/dumbbell-squats",
                instructions: "Hold dumbbells, squat down keeping chest up"
            },
            {
                id: "legs2",
                name: "Dumbbell Lunges",
                sets: 3,
                reps: "10-15 each leg",
                weight: 10,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/lunges",
                instructions: "Step forward into lunge, alternate legs"
            },
            {
                id: "legs3",
                name: "Leg Press (Machine)",
                sets: 3,
                reps: "12-20",
                weight: 60,
                equipment: "All-in-one Machine",
                videoPlaceholder: "https://example.com/leg-press",
                instructions: "Press weight with legs, control the descent"
            },
            {
                id: "legs4",
                name: "Leg Curls (Machine)",
                sets: 3,
                reps: "12-15",
                weight: 30,
                equipment: "All-in-one Machine",
                videoPlaceholder: "https://example.com/leg-curls",
                instructions: "Curl heels toward glutes"
            },
            {
                id: "legs5",
                name: "Calf Raises",
                sets: 3,
                reps: "15-25",
                weight: 15,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/calf-raises",
                instructions: "Rise up on toes, hold dumbbells for resistance"
            },
            {
                id: "cardio5",
                name: "Treadmill Intervals",
                sets: 1,
                reps: "15 min",
                weight: 0,
                equipment: "Treadmill",
                videoPlaceholder: "https://example.com/treadmill-intervals",
                instructions: "Alternate between fast and moderate pace"
            }
        ]
    },
    day6: {
        name: "Full Body + Abs",
        icon: "fas fa-fire",
        exercises: [
            {
                id: "full1",
                name: "Dumbbell Thrusters",
                sets: 3,
                reps: "8-12",
                weight: 8,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/thrusters",
                instructions: "Squat down, press dumbbells overhead as you stand"
            },
            {
                id: "full2",
                name: "Dumbbell Step-ups",
                sets: 3,
                reps: "10-15 each leg",
                weight: 8,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/step-ups",
                instructions: "Step up onto stable surface, alternate legs"
            },
            {
                id: "full3",
                name: "Burpees",
                sets: 3,
                reps: "5-10",
                weight: 0,
                equipment: "Bodyweight",
                videoPlaceholder: "https://example.com/burpees",
                instructions: "Squat, jump back, push-up, jump forward, jump up"
            },
            {
                id: "full4",
                name: "Dumbbell Clean & Press",
                sets: 3,
                reps: "6-10",
                weight: 10,
                equipment: "Dumbbells",
                videoPlaceholder: "https://example.com/clean-press",
                instructions: "Pull dumbbells to shoulders, press overhead"
            },
            {
                id: "full5",
                name: "Gym Ball Squats",
                sets: 3,
                reps: "12-20",
                weight: 0,
                equipment: "Gym Ball",
                videoPlaceholder: "https://example.com/ball-squats",
                instructions: "Squat with ball between back and wall"
            },
            {
                id: "abs6",
                name: "Gym Ball Crunches",
                sets: 3,
                reps: "15-25",
                weight: 0,
                equipment: "Gym Ball",
                videoPlaceholder: "https://example.com/ball-crunches",
                instructions: "Crunch on gym ball for extended range"
            },
            {
                id: "abs7",
                name: "Dead Bug",
                sets: 3,
                reps: "10-15 each side",
                weight: 0,
                equipment: "Yoga Mat",
                videoPlaceholder: "https://example.com/dead-bug",
                instructions: "Lie on back, extend opposite arm and leg"
            }
        ]
    }
};

// Get current day of week (0 = Sunday, 1 = Monday, etc.)
function getCurrentWorkoutDay() {
    const today = new Date().getDay();
    const workoutDays = {
        1: 'day1', // Monday
        2: 'day2', // Tuesday  
        3: 'day3', // Wednesday
        4: 'day4', // Thursday
        5: 'day5', // Friday
        6: 'day6', // Saturday
        0: 'rest', // Sunday
        7: 'rest'  // Sunday fallback
    };
    return workoutDays[today] || 'day1';
}

// Get workout data by day
function getWorkoutData(day) {
    return workoutData[day] || null;
}

// Get all workout days
function getAllWorkoutDays() {
    return Object.keys(workoutData);
}
