import { useState } from 'react';
import { Upload } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useOnboarding } from '../../context/OnboardingContext';

const requiredDocuments = [
  {
    id: 'doc1',
    name: 'Business Formation Documents',
    description: 'Articles of incorporation, operating agreement, etc.',
    icon: '📄',
    status: 'required' as const,
  },
  {
    id: 'doc2',
    name: 'Financial Statements',
    description: 'Last 3 years of financial statements',
    icon: '💰',
    status: 'required' as const,
  },
  {
    id: 'doc3',
    name: 'Banking Information',
    description: 'Recent bank statements (12 months)',
    icon: '🏦',
    status: 'required' as const,
  },
];

const DocumentUpload = () => {
  const { uploadDocument, documents } = useOnboarding();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Process files here
      // For demo, we'll just simulate uploading the first required document
      uploadDocument({
        ...requiredDocuments[0],
        status: 'uploaded',
        date: new Date(),
        size: 1200000, // 1.2 MB
      });
    }
  };

  const uploadedDocIds = documents.map(doc => doc.id);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-playfair mb-4">Upload Required Documents</h2>
      <p className="mb-6 text-cream-400">
        Please provide the following documents to complete your Canvas setup
      </p>

      <Card 
        className={cn(
          'mb-6 p-8 border-2 border-dashed flex flex-col items-center justify-center text-center',
          dragActive ? 'border-gold-400 bg-navy-700/50' : 'border-navy-700'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 mb-4 rounded-full bg-navy-700 flex items-center justify-center">
          <Upload size={28} className="text-cream-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">Drag and drop your documents here</h3>
        <p className="text-cream-500 mb-4">or</p>
        <Button variant="secondary">Browse Files</Button>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-2">Required Documents</h3>
        
        {requiredDocuments.map((doc) => {
          const isUploaded = uploadedDocIds.includes(doc.id);
          
          return (
            <Card key={doc.id} className="flex items-center p-4">
              <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-xl mr-4">
                {doc.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{doc.name}</h4>
                <p className="text-sm text-cream-500">{doc.description}</p>
              </div>
              <div className={cn(
                'px-2 py-1 text-xs rounded-full',
                isUploaded 
                  ? 'bg-success-500/20 text-success-500' 
                  : 'bg-warning-500/20 text-warning-500'
              )}>
                {isUploaded ? 'Uploaded' : 'Required'}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentUpload;