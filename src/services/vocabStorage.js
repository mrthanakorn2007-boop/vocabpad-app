// vocabStorage.js - Utility for managing vocabulary learning progress in localStorage

const STORAGE_PREFIX = 'vocabpad_';

// Storage keys
const MASTERED_KEY = (catId) => `${STORAGE_PREFIX}mastered_${catId}`;
const MISTAKES_KEY = (catId) => `${STORAGE_PREFIX}mistakes_${catId}`;

// Helper: Get Set from localStorage
const getSet = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? new Set(JSON.parse(data)) : new Set();
    } catch (e) {
        console.error('Error reading from localStorage:', e);
        return new Set();
    }
};

// Helper: Save Set to localStorage
const saveSet = (key, set) => {
    try {
        localStorage.setItem(key, JSON.stringify([...set]));
    } catch (e) {
        console.error('Error writing to localStorage:', e);
    }
};

// ============= Mastered Words =============

export const getMasteredWords = (categoryId) => {
    return getSet(MASTERED_KEY(categoryId));
};

export const addMasteredWord = (categoryId, word) => {
    const mastered = getSet(MASTERED_KEY(categoryId));
    mastered.add(word);
    saveSet(MASTERED_KEY(categoryId), mastered);

    // Important: Remove from mistakes when mastered
    removeMistake(categoryId, word);
};

export const removeMasteredWord = (categoryId, word) => {
    const mastered = getSet(MASTERED_KEY(categoryId));
    mastered.delete(word);
    saveSet(MASTERED_KEY(categoryId), mastered);
};

export const isMastered = (categoryId, word) => {
    const mastered = getSet(MASTERED_KEY(categoryId));
    return mastered.has(word);
};

export const clearAllMastered = (categoryId) => {
    localStorage.removeItem(MASTERED_KEY(categoryId));
};

// ============= Mistakes =============

export const getMistakes = (categoryId) => {
    return getSet(MISTAKES_KEY(categoryId));
};

export const addMistake = (categoryId, word) => {
    const mistakes = getSet(MISTAKES_KEY(categoryId));
    mistakes.add(word);
    saveSet(MISTAKES_KEY(categoryId), mistakes);
};

export const removeMistake = (categoryId, word) => {
    const mistakes = getSet(MISTAKES_KEY(categoryId));
    mistakes.delete(word);
    saveSet(MISTAKES_KEY(categoryId), mistakes);
};

export const clearAllMistakes = (categoryId) => {
    localStorage.removeItem(MISTAKES_KEY(categoryId));
};

// ============= Progress Stats =============

export const getProgress = (categoryId, totalWords) => {
    const masteredCount = getMasteredWords(categoryId).size;
    const percentage = totalWords > 0 ? Math.round((masteredCount / totalWords) * 100) : 0;

    return {
        masteredCount,
        totalWords,
        percentage,
        mistakeCount: getMistakes(categoryId).size
    };
};

// Get progress for all categories
export const getAllProgress = (categories) => {
    return categories.map(cat => ({
        id: cat.id,
        title: cat.title,
        ...getProgress(cat.id, cat.words?.length || 0)
    }));
};
