import { useState } from 'react';
import Tabs from '../ui/Tabs';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useOnboarding } from '../../context/OnboardingContext';

const IdentityVerification = () => {
  const { personalInfo, updatePersonalInfo, contactInfo, updateContactInfo } = useOnboarding();
  
  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic
  };

  const handleContactInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic
  };

  const PersonalInfoTab = () => (
    <form onSubmit={handlePersonalInfoSubmit} className="space-y-4 max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={personalInfo.firstName}
          onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
          required
        />
        <Input
          label="Last Name"
          value={personalInfo.lastName}
          onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
          required
        />
      </div>
      <Input
        label="Date of Birth"
        type="date"
        value={personalInfo.dob}
        onChange={(e) => updatePersonalInfo({ dob: e.target.value })}
        required
      />
      <Input
        label="Social Security Number"
        placeholder="XXX-XX-XXXX"
        value={personalInfo.ssn}
        onChange={(e) => updatePersonalInfo({ ssn: e.target.value })}
        required
      />
      <div className="pt-4">
        <Button type="submit">
          Save & Continue
        </Button>
      </div>
    </form>
  );

  const ContactDetailsTab = () => (
    <form onSubmit={handleContactInfoSubmit} className="space-y-4 max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          value={contactInfo.email}
          onChange={(e) => updateContactInfo({ email: e.target.value })}
          required
        />
        <Input
          label="Phone"
          type="tel"
          value={contactInfo.phone}
          onChange={(e) => updateContactInfo({ phone: e.target.value })}
          required
        />
      </div>
      <Input
        label="Street Address"
        value={contactInfo.address}
        onChange={(e) => updateContactInfo({ address: e.target.value })}
        required
      />
      <div className="grid grid-cols-3 gap-4">
        <Input
          label="City"
          value={contactInfo.city}
          onChange={(e) => updateContactInfo({ city: e.target.value })}
          required
        />
        <Input
          label="State"
          value={contactInfo.state}
          onChange={(e) => updateContactInfo({ state: e.target.value })}
          required
        />
        <Input
          label="ZIP Code"
          value={contactInfo.zip}
          onChange={(e) => updateContactInfo({ zip: e.target.value })}
          required
        />
      </div>
      <div className="pt-4">
        <Button type="submit">
          Save & Continue
        </Button>
      </div>
    </form>
  );

  const IdentityDocumentsTab = () => (
    <div className="space-y-4 max-w-xl">
      <p className="text-cream-400 mb-6">
        Please provide a government-issued ID to verify your identity.
      </p>
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-navy-700 rounded-card">
        <div className="w-12 h-12 mb-4 rounded-full bg-navy-700 flex items-center justify-center">
          <span className="text-xl">🪪</span>
        </div>
        <h3 className="text-lg font-medium mb-2">Upload ID Document</h3>
        <p className="text-cream-500 text-sm mb-4 text-center">
          Driver's license, passport, or state ID<br />
          JPG, PNG or PDF up to 10MB
        </p>
        <Button variant="secondary">Upload ID</Button>
      </div>
    </div>
  );

  const tabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      content: <PersonalInfoTab />
    },
    {
      id: 'contact',
      label: 'Contact Details',
      content: <ContactDetailsTab />
    },
    {
      id: 'identity',
      label: 'Identity Documents',
      content: <IdentityDocumentsTab />
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-playfair mb-4">Identity Verification</h2>
      <p className="mb-6 text-cream-400">
        Please provide your personal information to verify your identity
      </p>
      
      <Tabs tabs={tabs} defaultTab="personal" />
    </div>
  );
};

export default IdentityVerification;