import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Camera } from 'lucide-react';
import { useProfileStore } from '../../store/profile.store';
import { useToastStore } from '../../store/toast.store';

export default function EditProfile() {
  const navigate = useNavigate();
  const store = useProfileStore();
  const { addToast } = useToastStore();

  const [name, setName] = useState(store.profile.name);
  const [username, setUsername] = useState(store.profile.username);
  const [bio, setBio] = useState(store.profile.bio);
  const [location, setLocation] = useState(store.profile.location);

  const handleSave = () => {
    store.updateProfile({ name, username, bio, location });
    addToast('Profile updated successfully!', 'success');
    navigate(-1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-bg overflow-y-auto flex flex-col z-50 pt-6"
    >
      <div className="sticky top-0 z-20 px-4 pb-4 bg-bg/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="cursor-pointer">
            <ChevronLeft size={24} className="text-text" />
          </motion.div>
          <span className="text-[18px] font-bold text-text">Edit Profile</span>
        </div>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="text-[14px] font-bold text-primary-light cursor-pointer"
        >
          Save
        </motion.button>
      </div>
      
      <div className="flex-1 px-4 pt-4 pb-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-3">
            <div 
              className="w-[100px] h-[100px] rounded-full flex justify-center items-center shadow-lg" 
              style={{ background: store.profile.avatarGradient }}
            >
              <span className="text-[40px] font-bold text-white leading-none pb-1">{store.profile.name.charAt(0)}</span>
            </div>
            <div className="absolute bottom-0 right-0 w-[32px] h-[32px] bg-card border-[3px] border-bg rounded-full flex items-center justify-center cursor-pointer shadow-md">
              <Camera size={16} className="text-text" />
            </div>
          </div>
          <span className="text-[14px] font-medium text-primary-light cursor-pointer">Change Avatar</span>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-5">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-text3 uppercase tracking-wider">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-card border-[0.5px] border-border rounded-2xl px-4 py-3.5 text-[15px] text-text outline-none focus:border-primary-light transition-colors"
              placeholder="Your name"
            />
          </div>

          {/* Username Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-text3 uppercase tracking-wider">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-card border-[0.5px] border-border rounded-2xl px-4 py-3.5 text-[15px] text-text outline-none focus:border-primary-light transition-colors"
              placeholder="@username"
            />
          </div>

          {/* Bio Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-text3 uppercase tracking-wider">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full bg-card border-[0.5px] border-border rounded-2xl px-4 py-3.5 text-[15px] text-text outline-none focus:border-primary-light transition-colors resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Location Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-text3 uppercase tracking-wider">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-card border-[0.5px] border-border rounded-2xl px-4 py-3.5 text-[15px] text-text outline-none focus:border-primary-light transition-colors"
              placeholder="Your location"
            />
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="w-full mt-8 bg-primary text-white font-bold py-4 rounded-2xl text-[16px] shadow-lg"
        >
          Save Changes
        </motion.button>
      </div>
    </motion.div>
  );
}
