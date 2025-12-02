export interface OnboardingFormData {
  // Step 1
  firstName?: string;
  lastName?: string;

  // Step 2
  dateOfBirth?: string;

  // Step 3
  gender?: string;

  // Step 4
  ethnicity?: string;

  // Step 5
  cityOfResidence?: string;

  // Step 6
  areaGrowUp?: string;

  // Step 7
  nativeLanguage?: string;

  // Step 8
  dialect?: string;

  // Step 9
  educationLevel?: string;

  // Step 10
  languageProficiency?: {
    listening: Array<number>;
    speaking: Array<number>;
    reading: Array<number>;
    writing: Array<number>;
  };

  // Step 11
  languageUsage?: Array<string>;

  // Step 12
  quizAnswers?: Record<string, string>;

  // Audio Step
  audioURL?: string; // For preview purposes (blob URL)
  audioBase64?: string; // For backend submission
  audioMimeType?: string;
  audioRecordingDuration?: number;
}

const STORAGE_KEY = "onboarding_form_data";

export const formStorage = {
  get: (): OnboardingFormData => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return {};
    }
  },

  update: (newData: Partial<OnboardingFormData>): void => {
    try {
      const existingData = formStorage.get();
      const updatedData = { ...existingData, ...newData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },

  getStep: (stepFields: string[]): Partial<OnboardingFormData> => {
    const allData = formStorage.get();
    return stepFields.reduce((acc, field) => {
      if (field in allData) {
        acc[field] = allData[field];
      }
      return acc;
    }, {} as Partial<OnboardingFormData>);
  },
};
