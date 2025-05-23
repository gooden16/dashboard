import { createContext, useState, useContext, ReactNode } from 'react';
import { DocumentType } from '../types';

interface OnboardingContextType {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  documents: DocumentType[];
  uploadDocument: (document: DocumentType) => void;
  personalInfo: {
    firstName: string;
    lastName: string;
    dob: string;
    ssn: string;
  };
  updatePersonalInfo: (info: Partial<OnboardingContextType['personalInfo']>) => void;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  updateContactInfo: (info: Partial<OnboardingContextType['contactInfo']>) => void;
}

const initialPersonalInfo = {
  firstName: '',
  lastName: '',
  dob: '',
  ssn: '',
};

const initialContactInfo = {
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState('documents');
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [contactInfo, setContactInfo] = useState(initialContactInfo);

  const uploadDocument = (document: DocumentType) => {
    setDocuments([...documents, document]);
  };

  const updatePersonalInfo = (info: Partial<typeof personalInfo>) => {
    setPersonalInfo({ ...personalInfo, ...info });
  };

  const updateContactInfo = (info: Partial<typeof contactInfo>) => {
    setContactInfo({ ...contactInfo, ...info });
  };

  return (
    <OnboardingContext.Provider value={{
      currentStep,
      setCurrentStep,
      documents,
      uploadDocument,
      personalInfo,
      updatePersonalInfo,
      contactInfo,
      updateContactInfo,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};