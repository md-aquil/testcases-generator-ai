
import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { User, Mail, Building, Briefcase, Camera, Save, Image as ImageIcon } from 'lucide-react';

interface ProfilePageProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState(profile);
  const [isSaved, setIsSaved] = useState(false);
  
  // Image States
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  // File Refs
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'avatar') setAvatarUrl(result);
        if (type === 'banner') setBannerUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Profile Settings</h2>

      <div className="bg-white dark:bg-[#131316] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
        
        {/* Banner / Avatar Section */}
        <div className="relative h-32 group/banner">
           {/* Banner Image or Gradient */}
           {bannerUrl ? (
             <img src={bannerUrl} alt="Cover" className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
           )}
           
           {/* Banner Upload Trigger */}
           <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/banner:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => bannerInputRef.current?.click()}>
              <div className="flex items-center gap-2 text-white font-medium bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                 <ImageIcon className="w-4 h-4" />
                 <span>Change Cover</span>
              </div>
           </div>
           <input 
             type="file" 
             ref={bannerInputRef} 
             className="hidden" 
             accept="image/*"
             onChange={(e) => handleFileChange(e, 'banner')}
           />

          <div className="absolute -bottom-10 left-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-[#131316] p-1 shadow-xl overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover bg-gray-100" />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-2xl font-bold text-gray-500 dark:text-gray-400">
                    {formData.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-1 right-1 p-2 bg-white dark:bg-black rounded-full shadow-lg border border-gray-100 dark:border-white/10 text-gray-500 hover:text-indigo-600 transition-colors z-10"
                title="Upload Profile Picture"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input 
                 type="file" 
                 ref={avatarInputRef} 
                 className="hidden" 
                 accept="image/*"
                 onChange={(e) => handleFileChange(e, 'avatar')}
              />
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="email" 
                    value={formData.email}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Company</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={formData.company || ''}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Company Name"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Job Title</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={formData.jobTitle || ''}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    placeholder="e.g. QA Engineer"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-gray-100 dark:border-white/5">
              <button 
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-500/20"
              >
                {isSaved ? 'Saved!' : 'Save Changes'}
                {!isSaved && <Save className="w-4 h-4" />}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
