const DB_NAME = 'DragonsDilemmaDB';
const DB_VERSION = 2;
const PET_STORE_NAME = 'pets';

let db;

/**
 * Initializes the IndexedDB database.
 * @returns {Promise<IDBDatabase>} A promise that resolves with the database object.
 */
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(PET_STORE_NAME)) {
        db.createObjectStore(PET_STORE_NAME, { keyPath: 'pet_id' });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
};

/**
 * Saves a pet object to the database (creates or updates).
 * @param {object} pet - The pet object to save.
 * @returns {Promise<void>}
 */
export const savePet = (pet) => {
  return new Promise((resolve, reject) => {
    if (!db) reject('DB not initialized');
    const transaction = db.transaction([PET_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(PET_STORE_NAME);
    // Add last_quiz_date if it doesn't exist
    if (!pet.last_quiz_date) {
      pet.last_quiz_date = new Date().toISOString().slice(0, 10);
    }
    const request = store.put(pet);

    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event.target.error);
  });
};

/**
 * Retrieves a pet object from the database.
 * @param {number} pet_id - The ID of the pet to retrieve.
 * @returns {Promise<object>}
 */
export const getPet = (pet_id) => {
  return new Promise((resolve, reject) => {
    if (!db) reject('DB not initialized');
    const transaction = db.transaction([PET_STORE_NAME], 'readonly');
    const store = transaction.objectStore(PET_STORE_NAME);
    const request = store.get(pet_id);

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

/**
 * Deletes a pet object from the database.
 * @param {number} pet_id - The ID of the pet to delete.
 * @returns {Promise<void>}
 */
export const deletePet = (pet_id) => {
  return new Promise((resolve, reject) => {
    if (!db) reject('DB not initialized');
    const transaction = db.transaction([PET_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(PET_STORE_NAME);
    const request = store.delete(pet_id);

    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event.target.error);
  });
};

/**
 * Updates a pet's stats and quiz count.
 * @param {number} pet_id - The ID of the pet to update.
 * @param {object} newStats - The new stats object { wisdom, aggression }.
 * @param {number} quizCountIncrement - The amount to increment quiz_count_total by.
 * @returns {Promise<void>}
 */
export const updatePetStatsAndQuizCount = async (pet_id, newStats, quizCountIncrement) => {
    const pet = await getPet(pet_id);
    if (pet) {
        pet.stats = { ...pet.stats, ...newStats };
        pet.quiz_count_total += quizCountIncrement;
        return savePet(pet);
    }
    return Promise.reject('Pet not found');
};

/**
 * Updates the quiz count for today and the last quiz date.
 * @param {number} pet_id - The ID of the pet to update.
 * @returns {Promise<void>}
 */
export const updateQuizDateAndCount = async (pet_id) => {
    const pet = await getPet(pet_id);
    if (pet) {
        const today = new Date().toISOString().slice(0, 10);
        if (pet.last_quiz_date !== today) {
            pet.last_quiz_date = today;
            pet.quiz_count_today = 1;
        } else {
            pet.quiz_count_today += 1;
        }
        return savePet(pet);
    }
    return Promise.reject('Pet not found');
};