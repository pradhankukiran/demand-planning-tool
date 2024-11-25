import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  accept: Record<string, string[]>;
  label: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, accept, label }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
      } ${acceptedFiles.length > 0 ? 'bg-green-50 border-green-500' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-2">
        <Upload className={`w-8 h-8 ${
          acceptedFiles.length > 0 ? 'text-green-500' : 'text-gray-400'
        }`} />
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {acceptedFiles.length > 0 ? (
          <p className="text-xs text-green-600">File loaded: {acceptedFiles[0].name}</p>
        ) : isDragActive ? (
          <p className="text-sm text-blue-500">Drop the file here...</p>
        ) : (
          <p className="text-xs text-gray-400">Drag & drop or click to select</p>
        )}
      </div>
    </div>
  );
};