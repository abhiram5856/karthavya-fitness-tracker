// Main application JavaScript for Fitness Tracker
class FitnessTracker {
    constructor() {
        this.currentView = 'dashboard';
        this.currentDay = null;
        this.timer = null;
        this.timerInterval = null;
        this.timerDuration = 90; // seconds
        this.timerRemaining = 90;
        
        this.init();
    }

    init() {
        this.showSplashScreen();
        this.setupEventListeners();
        this.loadDashboard();
        this.initializeProgress();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const day = item.dataset.day;
                this.navigateToDay(day);
            });
        });


        // Timer controls
        document.getElementById('timer-start').addEventListener('click', () => {
            this.startTimer();
        });

        document.getElementById('timer-pause').addEventListener('click', () => {
            this.pauseTimer();
        });

        document.getElementById('timer-reset').addEventListener('click', () => {
            this.resetTimer();
        });

        // Timer duration slider
        document.getElementById('timer-duration').addEventListener('input', (e) => {
            this.timerDuration = parseInt(e.target.value);
            this.timerRemaining = this.timerDuration;
            this.updateTimerDisplay();
        });
    }


    navigateToDay(day) {
        // Update active navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-day="${day}"]`).classList.add('active');

        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.add('hidden');
        });

        // Show appropriate view
        if (day === 'dashboard') {
            this.showDashboard();
        } else if (day === 'rest') {
            this.showRestDay();
        } else {
            this.showWorkoutDay(day);
        }

        this.currentView = day;
    }

    showDashboard() {
        document.getElementById('dashboard-view').classList.remove('hidden');
        this.loadDashboard();
    }

    showRestDay() {
        document.getElementById('rest-view').classList.remove('hidden');
    }

    showWorkoutDay(day) {
        document.getElementById('workout-view').classList.remove('hidden');
        this.loadWorkout(day);
    }

    loadDashboard() {
        this.updateStats();
        this.loadCharts();
        this.loadTodayWorkout();
    }

    updateStats() {
        const progress = this.getWeeklyProgress();
        const calories = this.getTotalCalories();
        const streak = this.getCurrentStreak();

        document.getElementById('weekly-workouts').textContent = `${progress.completed}/${progress.total}`;
        document.getElementById('total-calories').textContent = calories;
        document.getElementById('current-streak').textContent = `${streak} days`;
    }

    getWeeklyProgress() {
        const progress = JSON.parse(localStorage.getItem('weeklyProgress') || '{"completed": 0, "total": 6}');
        return progress;
    }

    getTotalCalories() {
        return localStorage.getItem('totalCalories') || '0';
    }

    getCurrentStreak() {
        return localStorage.getItem('currentStreak') || '0';
    }

    loadCharts() {
        this.loadWeeklyChart();
        this.loadMonthlyChart();
        this.loadWeightChart();
    }

    loadWeeklyChart() {
        const ctx = document.getElementById('weekly-chart').getContext('2d');
        const weeklyData = this.getWeeklyChartData();
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Workouts Completed',
                    data: weeklyData,
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1
                    }
                }
            }
        });
    }

    loadMonthlyChart() {
        const ctx = document.getElementById('monthly-chart').getContext('2d');
        const monthlyData = this.getMonthlyChartData();
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Weekly Completion %',
                    data: monthlyData,
                    borderColor: 'rgba(34, 197, 94, 1)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    getWeeklyChartData() {
        const data = JSON.parse(localStorage.getItem('weeklyChartData') || '[0,0,0,0,0,0,0]');
        return data;
    }

    getMonthlyChartData() {
        const data = JSON.parse(localStorage.getItem('monthlyChartData') || '[0,0,0,0]');
        return data;
    }

    loadTodayWorkout() {
        const today = getCurrentWorkoutDay();
        const container = document.getElementById('today-workout');
        console.log('Loading today workout for:', today);
        
        if (today === 'rest') {
            container.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-bed text-4xl text-gray-400 mb-4"></i>
                    <p class="text-lg">Today is your rest day. Take time to recover!</p>
                </div>
            `;
        } else {
            const workout = getWorkoutData(today);
            const isCompleted = localStorage.getItem(`workout_completed_${today}`) === new Date().toDateString();
            
            if (workout) {
                container.innerHTML = `
                    <div class="flex items-center justify-between">
                        <div>
                            <h4 class="text-lg font-semibold text-gray-800">${workout.name}</h4>
                            <p class="text-gray-600">${workout.exercises.length} exercises</p>
                            ${isCompleted ? '<p class="text-sm text-green-600"><i class="fas fa-check mr-1"></i>Completed today</p>' : ''}
                        </div>
                        <div class="flex space-x-2">
                            <button onclick="window.fitnessTracker.navigateToDay('${today}')" 
                                    class="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                                ${isCompleted ? 'View Workout' : 'Start Workout'}
                            </button>
                            ${isCompleted ? `
                                <button onclick="window.fitnessTracker.resetWorkout('${today}')" 
                                        class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                                    <i class="fas fa-redo mr-1"></i>Reset
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `;
            }
        }
    }

    loadWorkout(day) {
        const workout = getWorkoutData(day);
        if (!workout) return;

        this.currentDay = day;
        document.getElementById('workout-title').textContent = workout.name;
        
        // Record workout start time
        localStorage.setItem(`workout_start_${day}`, Date.now().toString());
        
        const container = document.getElementById('exercises-container');
        container.innerHTML = '';

        workout.exercises.forEach((exercise, index) => {
            const exerciseCard = this.createExerciseCard(exercise, index);
            container.appendChild(exerciseCard);
        });

        this.updateWorkoutProgress();
    }

    createExerciseCard(exercise, index) {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        card.id = `exercise-${exercise.id}`;

        const progress = this.getExerciseProgress(exercise.id);
        const isCompleted = progress.completed;

        card.innerHTML = `
            <div class="exercise-header">
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">${exercise.name}</h3>
                    <p class="text-sm text-gray-600 mb-2">${exercise.instructions}</p>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <span><i class="fas fa-dumbbell mr-1"></i>${exercise.equipment}</span>
                        ${exercise.weight > 0 ? `<span><i class="fas fa-weight-hanging mr-1"></i>${exercise.weight}kg</span>` : ''}
                    </div>
                </div>
                <div class="exercise-video-section">
                    <div class="video-placeholder cursor-pointer" onclick="window.fitnessTracker.openVideoModal('${exercise.id}')">
                        <i class="fas fa-play-circle text-2xl text-gray-400"></i>
                        <p class="text-xs mt-1">Watch Video</p>
                    </div>
                    <button onclick="window.fitnessTracker.editVideoLink('${exercise.id}')" class="video-button">
                        <i class="fas fa-edit mr-1"></i>Edit Link
                    </button>
                </div>
            </div>

            <div class="space-y-3">
                ${this.createSetsHTML(exercise, progress)}
            </div>

            <div class="mt-4 flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <label class="text-sm text-gray-600">Weight:</label>
                    <input type="number" min="0" max="50" step="0.5" 
                           value="${exercise.weight}" 
                           class="set-input w-20"
                           onchange="window.fitnessTracker.updateExerciseWeight('${exercise.id}', this.value)">
                    <span class="text-sm text-gray-500">kg</span>
                </div>
                <div class="flex space-x-2">
                        <button onclick="window.fitnessTracker.startRestTimer()" 
                                class="px-3 py-1 bg-blue-900 text-white text-sm rounded hover:bg-blue-800">
                            <i class="fas fa-clock mr-1"></i>Rest Timer
                        </button>
                        <button onclick="window.fitnessTracker.markExerciseComplete('${exercise.id}')" 
                                class="px-3 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600">
                            <i class="fas fa-check mr-1"></i>Complete
                        </button>
                        <button onclick="window.fitnessTracker.skipExercise('${exercise.id}')" 
                                class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                            <i class="fas fa-times mr-1"></i>Skip
                        </button>
                </div>
            </div>
        `;

        if (isCompleted) {
            card.classList.add('completed');
        }

        return card;
    }

    createSetsHTML(exercise, progress) {
        let html = '';
        for (let i = 1; i <= exercise.sets; i++) {
            const setCompleted = progress.sets && progress.sets[i-1];
            html += `
                <div class="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <span class="text-sm font-medium text-gray-700 w-12">Set ${i}:</span>
                    <div class="flex items-center space-x-2">
                        <input type="number" min="1" max="50" 
                               value="${exercise.reps.toString().split('-')[0] || exercise.reps.split(' ')[0] || '10'}" 
                               class="set-input"
                               placeholder="Reps">
                        <span class="text-sm text-gray-500">reps</span>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" 
                               class="set-checkbox" 
                               ${setCompleted ? 'checked' : ''}
                               onchange="window.fitnessTracker.toggleSet('${exercise.id}', ${i-1})">
                        <label class="ml-2 text-sm text-gray-600">Complete</label>
                    </div>
                </div>
            `;
        }
        return html;
    }

    getExerciseProgress(exerciseId) {
        const dayProgress = JSON.parse(localStorage.getItem(`progress_${this.currentDay}`) || '{}');
        return dayProgress[exerciseId] || { completed: false, sets: [] };
    }

    toggleSet(exerciseId, setIndex) {
        const dayProgress = JSON.parse(localStorage.getItem(`progress_${this.currentDay}`) || '{}');
        
        if (!dayProgress[exerciseId]) {
            dayProgress[exerciseId] = { completed: false, sets: [] };
        }

        dayProgress[exerciseId].sets[setIndex] = !dayProgress[exerciseId].sets[setIndex];
        
        // Check if all sets are completed
        const workout = getWorkoutData(this.currentDay);
        const exercise = workout.exercises.find(ex => ex.id === exerciseId);
        const allSetsCompleted = dayProgress[exerciseId].sets.filter(Boolean).length === exercise.sets;
        
        dayProgress[exerciseId].completed = allSetsCompleted;

        localStorage.setItem(`progress_${this.currentDay}`, JSON.stringify(dayProgress));
        
        // Update UI
        const card = document.getElementById(`exercise-${exerciseId}`);
        if (allSetsCompleted) {
            card.classList.add('completed');
            this.showCelebration();
        } else {
            card.classList.remove('completed');
        }

        this.updateWorkoutProgress();
    }

    updateExerciseWeight(exerciseId, weight) {
        // Update weight in workout data (this could be saved to localStorage for persistence)
        const weights = JSON.parse(localStorage.getItem('exerciseWeights') || '{}');
        weights[exerciseId] = parseFloat(weight);
        localStorage.setItem('exerciseWeights', JSON.stringify(weights));
    }

    updateWorkoutProgress() {
        if (!this.currentDay) return;

        const workout = getWorkoutData(this.currentDay);
        const dayProgress = JSON.parse(localStorage.getItem(`progress_${this.currentDay}`) || '{}');
        
        const completedExercises = Object.values(dayProgress).filter(ex => ex.completed).length;
        const totalExercises = workout.exercises.length;
        const percentage = Math.round((completedExercises / totalExercises) * 100);

        document.getElementById('workout-progress').style.width = `${percentage}%`;
        document.getElementById('progress-text').textContent = `${percentage}% Complete`;

        if (percentage === 100) {
            this.completeWorkout();
        }
    }

    completeWorkout() {
        // Calculate workout stats
        const workout = getWorkoutData(this.currentDay);
        const dayProgress = JSON.parse(localStorage.getItem(`progress_${this.currentDay}`) || '{}');
        
        const totalExercises = workout.exercises.length;
        const completedExercises = Object.values(dayProgress).filter(ex => ex.completed).length;
        const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets, 0);
        const completedSets = Object.values(dayProgress).reduce((sum, ex) => {
            return sum + (ex.sets ? ex.sets.filter(Boolean).length : 0);
        }, 0);
        
        // Estimate calories burned (rough calculation)
        const estimatedCalories = Math.round(totalExercises * 25 + completedSets * 5);
        
        // Update weekly progress
        const progress = this.getWeeklyProgress();
        progress.completed = Math.min(progress.completed + 1, progress.total);
        localStorage.setItem('weeklyProgress', JSON.stringify(progress));

        // Update streak
        const currentStreak = parseInt(this.getCurrentStreak()) + 1;
        localStorage.setItem('currentStreak', currentStreak.toString());
        
        // Update total calories
        const totalCalories = parseInt(localStorage.getItem('totalCalories') || '0') + estimatedCalories;
        localStorage.setItem('totalCalories', totalCalories.toString());
        
        // Save workout completion date
        const today = new Date().toDateString();
        localStorage.setItem(`workout_completed_${this.currentDay}`, today);

        // Show workout summary
        this.showWorkoutSummary({
            workoutName: workout.name,
            totalExercises,
            completedExercises,
            totalSets,
            completedSets,
            estimatedCalories,
            duration: this.calculateWorkoutDuration()
        });
        
        // Show motivational message
        this.showMotivationalMessage();
    }

    showCelebration() {
        // Simple celebration animation
        const progressBar = document.getElementById('workout-progress');
        progressBar.classList.add('celebration');
        setTimeout(() => {
            progressBar.classList.remove('celebration');
        }, 500);
    }

    showWorkoutSummary(stats) {
        const modal = document.createElement('div');
        modal.className = 'workout-summary-modal';
        modal.innerHTML = `
            <div class="workout-summary-content">
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-trophy text-3xl text-green-600"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Workout Complete!</h2>
                    <p class="text-gray-600">${stats.workoutName}</p>
                </div>
                
                <div class="space-y-3 mb-6">
                    <div class="summary-stat">
                        <span class="text-gray-600">Exercises Completed</span>
                        <span class="font-semibold">${stats.completedExercises}/${stats.totalExercises}</span>
                    </div>
                    <div class="summary-stat">
                        <span class="text-gray-600">Sets Completed</span>
                        <span class="font-semibold">${stats.completedSets}/${stats.totalSets}</span>
                    </div>
                    <div class="summary-stat">
                        <span class="text-gray-600">Estimated Calories</span>
                        <span class="font-semibold">${stats.estimatedCalories} kcal</span>
                    </div>
                    <div class="summary-stat">
                        <span class="text-gray-600">Duration</span>
                        <span class="font-semibold">${stats.duration}</span>
                    </div>
                </div>
                
                <div class="flex justify-center space-x-3">
                    <button onclick="window.fitnessTracker.addCalories()" 
                            class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                        <i class="fas fa-fire mr-2"></i>Log Calories
                    </button>
                    <button onclick="window.fitnessTracker.closeSummaryModal()" 
                            class="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                        <i class="fas fa-check mr-2"></i>Done
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    closeSummaryModal() {
        const modal = document.querySelector('.workout-summary-modal');
        if (modal) {
            modal.remove();
        }
        // Navigate back to dashboard
        this.navigateToDay('dashboard');
    }
    
    addCalories() {
        const calories = prompt('Enter actual calories burned (optional):');
        if (calories && !isNaN(calories)) {
            const currentCalories = parseInt(localStorage.getItem('totalCalories') || '0');
            const newTotal = currentCalories + parseInt(calories);
            localStorage.setItem('totalCalories', newTotal.toString());
            alert(`Added ${calories} calories to your total!`);
        }
        this.closeSummaryModal();
    }
    
    calculateWorkoutDuration() {
        // Simple duration calculation - could be enhanced with actual timing
        const startTime = localStorage.getItem(`workout_start_${this.currentDay}`);
        if (startTime) {
            const duration = Date.now() - parseInt(startTime);
            const minutes = Math.round(duration / 60000);
            return `${minutes} min`;
        }
        return '~60 min';
    }

    // Timer functions
    startRestTimer() {
        document.getElementById('timer-section').classList.remove('hidden');
        this.startTimer();
    }

    startTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timerInterval = setInterval(() => {
            this.timerRemaining--;
            this.updateTimerDisplay();

            if (this.timerRemaining <= 0) {
                this.timerComplete();
            }
        }, 1000);
    }

    pauseTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    resetTimer() {
        this.pauseTimer();
        this.timerRemaining = this.timerDuration;
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timerRemaining / 60);
        const seconds = this.timerRemaining % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = display;
    }

    timerComplete() {
        this.pauseTimer();
        alert('⏰ Rest time is over! Ready for your next set?');
        this.resetTimer();
        document.getElementById('timer-section').classList.add('hidden');
    }

    openVideoModal(exerciseId) {
        const videoUrl = this.getExerciseVideoUrl(exerciseId);
        if (videoUrl && videoUrl !== 'https://example.com/placeholder') {
            window.open(videoUrl, '_blank');
        } else {
            alert('No video link set for this exercise. Click "Edit Link" to add one.');
        }
    }

    editVideoLink(exerciseId) {
        const currentUrl = this.getExerciseVideoUrl(exerciseId);
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-content">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Edit Video Link</h3>
                <input type="url" 
                       value="${currentUrl || ''}" 
                       placeholder="Enter YouTube, Vimeo, or any video URL"
                       class="video-input mb-4" 
                       id="video-url-input">
                <div class="flex justify-end space-x-3">
                    <button onclick="window.fitnessTracker.closeVideoModal()" 
                            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                        Cancel
                    </button>
                    <button onclick="window.fitnessTracker.saveVideoLink('${exerciseId}')" 
                            class="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                        Save
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('video-url-input').focus();
    }

    closeVideoModal() {
        const modal = document.querySelector('.video-modal');
        if (modal) {
            modal.remove();
        }
    }

    saveVideoLink(exerciseId) {
        const input = document.getElementById('video-url-input');
        const url = input.value.trim();
        
        if (url) {
            const videoLinks = JSON.parse(localStorage.getItem('exerciseVideoLinks') || '{}');
            videoLinks[exerciseId] = url;
            localStorage.setItem('exerciseVideoLinks', JSON.stringify(videoLinks));
            alert('Video link saved successfully!');
        }
        
        this.closeVideoModal();
    }

    getExerciseVideoUrl(exerciseId) {
        const videoLinks = JSON.parse(localStorage.getItem('exerciseVideoLinks') || '{}');
        return videoLinks[exerciseId] || null;
    }

    markExerciseComplete(exerciseId) {
        const dayProgress = JSON.parse(localStorage.getItem(`progress_${this.currentDay}`) || '{}');
        const workout = getWorkoutData(this.currentDay);
        const exercise = workout.exercises.find(ex => ex.id === exerciseId);
        
        if (!dayProgress[exerciseId]) {
            dayProgress[exerciseId] = { completed: false, sets: [] };
        }
        
        // Mark all sets as completed
        for (let i = 0; i < exercise.sets; i++) {
            dayProgress[exerciseId].sets[i] = true;
        }
        dayProgress[exerciseId].completed = true;
        
        localStorage.setItem(`progress_${this.currentDay}`, JSON.stringify(dayProgress));
        
        // Update UI
        const card = document.getElementById(`exercise-${exerciseId}`);
        card.classList.add('completed');
        
        // Update all checkboxes
        const checkboxes = card.querySelectorAll('.set-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        
        this.updateWorkoutProgress();
        this.showCelebration();
    }

    editWeight() {
        console.log('editWeight called');
        // Close any existing modal first
        this.closeWeightModal();
        
        const currentWeight = this.getCurrentWeight();
        console.log('Current weight:', currentWeight);
        const modal = document.createElement('div');
        modal.className = 'weight-modal';
        modal.innerHTML = `
            <div class="weight-modal-content">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Update Your Weight</h3>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Weight (kg)</label>
                    <input type="number" 
                           value="${currentWeight}" 
                           placeholder="Enter weight in kg"
                           step="0.1"
                           min="30"
                           max="300"
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           id="weight-input">
                </div>
                <div class="flex justify-end space-x-3">
                    <button onclick="window.fitnessTracker.closeWeightModal()" 
                            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                        Cancel
                    </button>
                    <button onclick="window.fitnessTracker.saveWeight()" 
                            class="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                        Save
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeWeightModal();
            }
        });
        
        // Focus on input with a small delay
        setTimeout(() => {
            const input = document.getElementById('weight-input');
            if (input) {
                input.focus();
                input.select();
            }
        }, 100);
    }
    
    closeWeightModal() {
        const modal = document.querySelector('.weight-modal');
        if (modal) {
            modal.remove();
        }
    }
    
    saveWeight() {
        const input = document.getElementById('weight-input');
        if (!input) {
            console.error('Weight input not found');
            return;
        }
        
        const weight = parseFloat(input.value);
        
        if (weight && weight > 0 && weight >= 30 && weight <= 300) {
            const weightHistory = JSON.parse(localStorage.getItem('weightHistory') || '[]');
            const today = new Date().toDateString();
            
            // Add new weight entry
            weightHistory.push({
                date: today,
                weight: weight,
                timestamp: Date.now()
            });
            
            // Keep only last 30 entries
            if (weightHistory.length > 30) {
                weightHistory.shift();
            }
            
            localStorage.setItem('weightHistory', JSON.stringify(weightHistory));
            localStorage.setItem('currentWeight', weight.toString());
            
            // Update UI
            this.updateWeightDisplay();
            alert('Weight updated successfully!');
        } else {
            alert('Please enter a valid weight between 30 and 300 kg');
            return;
        }
        
        this.closeWeightModal();
    }
    
    getCurrentWeight() {
        return parseFloat(localStorage.getItem('currentWeight') || '105');
    }
    
    updateWeightDisplay() {
        const currentWeight = this.getCurrentWeight();
        const weightHistory = JSON.parse(localStorage.getItem('weightHistory') || '[]');
        
        // Update weight displays
        const currentWeightDisplay = document.getElementById('current-weight-display');
        const dashboardWeight = document.getElementById('dashboard-weight');
        
        if (currentWeightDisplay) {
            currentWeightDisplay.textContent = currentWeight;
        }
        if (dashboardWeight) {
            dashboardWeight.textContent = currentWeight;
        }
        
        // Calculate weight change
        if (weightHistory.length >= 2) {
            const previousWeight = weightHistory[weightHistory.length - 2].weight;
            const change = currentWeight - previousWeight;
            const changeElement = document.getElementById('weight-change');
            
            if (changeElement) {
                if (change > 0) {
                    changeElement.textContent = `+${change.toFixed(1)}kg`;
                    changeElement.className = 'text-xs text-red-500';
                } else if (change < 0) {
                    changeElement.textContent = `${change.toFixed(1)}kg`;
                    changeElement.className = 'text-xs text-green-500';
                } else {
                    changeElement.textContent = 'No change';
                    changeElement.className = 'text-xs text-gray-500';
                }
            }
        }
        
        // Update weight chart if visible
        if (document.getElementById('weight-chart')) {
            this.loadWeightChart();
        }
    }
    
    loadWeightChart() {
        const ctx = document.getElementById('weight-chart').getContext('2d');
        const weightHistory = JSON.parse(localStorage.getItem('weightHistory') || '[]');
        
        const labels = weightHistory.map(entry => {
            const date = new Date(entry.date);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        
        const data = weightHistory.map(entry => entry.weight);
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels.length > 0 ? labels : ['Start'],
                datasets: [{
                    label: 'Weight (kg)',
                    data: data.length > 0 ? data : [this.getCurrentWeight()],
                    borderColor: 'rgba(30, 58, 138, 1)',
                    backgroundColor: 'rgba(30, 58, 138, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: Math.min(...data, this.getCurrentWeight()) - 5,
                        max: Math.max(...data, this.getCurrentWeight()) + 5
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    initializeProgress() {
        // Initialize progress data if not exists
        if (!localStorage.getItem('weeklyProgress')) {
            localStorage.setItem('weeklyProgress', JSON.stringify({completed: 0, total: 6}));
        }
        if (!localStorage.getItem('totalCalories')) {
            localStorage.setItem('totalCalories', '0');
        }
        if (!localStorage.getItem('currentStreak')) {
            localStorage.setItem('currentStreak', '0');
        }
        if (!localStorage.getItem('currentWeight')) {
            localStorage.setItem('currentWeight', '105');
        }
        
        // Update weight display on load
        this.updateWeightDisplay();
    }
    
    resetWorkout(day) {
        console.log('Resetting workout for:', day);
        // Clear workout progress
        localStorage.removeItem(`progress_${day}`);
        localStorage.removeItem(`workout_completed_${day}`);
        localStorage.removeItem(`workout_start_${day}`);
        
        // Update weekly progress
        const progress = this.getWeeklyProgress();
        progress.completed = Math.max(0, progress.completed - 1);
        localStorage.setItem('weeklyProgress', JSON.stringify(progress));
        
        // Refresh the dashboard
        this.loadTodayWorkout();
        this.updateStats();
        
        alert('Workout reset successfully! You can start fresh.');
    }
    
    showMotivationalMessage() {
        const messages = [
            "Duty accomplished! 💪",
            "Another step closer to your goal!",
            "Consistency is your superpower!",
            "KARTHAVYA completed! Well done!",
            "Your commitment shows! Keep going!",
            "Excellence achieved today!"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Show motivational popup after a short delay
        setTimeout(() => {
            const popup = document.createElement('div');
            popup.className = 'fixed top-4 right-4 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
            popup.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-star mr-2"></i>
                    <span class="font-medium">${randomMessage}</span>
                </div>
            `;
            
            document.body.appendChild(popup);
            
            // Slide in
            setTimeout(() => {
                popup.classList.remove('translate-x-full');
            }, 100);
            
            // Slide out after 4 seconds
            setTimeout(() => {
                popup.classList.add('translate-x-full');
                setTimeout(() => {
                    popup.remove();
                }, 300);
            }, 4000);
        }, 1000);
    }
    
    showSplashScreen() {
        // Hide splash screen after 3 seconds
        setTimeout(() => {
            const splashScreen = document.getElementById('splash-screen');
            if (splashScreen) {
                splashScreen.style.opacity = '0';
                splashScreen.style.transition = 'opacity 0.5s ease-out';
                setTimeout(() => {
                    splashScreen.remove();
                }, 500);
            }
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing fitness tracker...');
    try {
        window.fitnessTracker = new FitnessTracker();
        console.log('Fitness tracker initialized successfully');
    } catch (error) {
        console.error('Error initializing fitness tracker:', error);
    }
});
