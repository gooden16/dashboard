import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface CanvasReviewStatusProps {
  canvasId?: string;
}

const CanvasReviewStatus: React.FC<CanvasReviewStatusProps> = ({ canvasId }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Clock className="w-8 h-8 text-blue-500" />
        <div>
          <h2 className="text-lg font-medium text-gray-900">Canvas Review Status</h2>
          <p className="text-gray-500">Canvas ID: {canvasId || 'Not provided'}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <span className="text-gray-700">Review in progress</span>
        </div>
      </div>
    </div>
  );
};

export default CanvasReviewStatus;