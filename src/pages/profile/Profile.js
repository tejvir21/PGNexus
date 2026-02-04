import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield
} from 'lucide-react';
import { useAuthStore } from '../../store';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import { validateEmail, validatePhone, formatDate } from '../../utils/helpers';

const Profile = () => {
  const { user, updateUser } = useAuthStore();

  // Editable state mirrors the current user object
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    alternatePhone: user?.alternatePhone || '',
    bio: user?.bio || '',
  });
  const [errors, setErrors] = useState({});

  // ─── helpers ────────────────────────────────────────────
  const roleMeta = {
    admin: { label: 'Administrator', color: 'danger', desc: 'Full system access' },
    owner: { label: 'Property Owner', color: 'primary', desc: 'Manage your properties' },
    tenant: { label: 'Tenant', color: 'success', desc: 'View your room & payments' },
  };
  const meta = roleMeta[user?.role] || roleMeta.tenant;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!validateEmail(formData.email)) errs.email = 'Invalid email address';
    if (formData.phone && !validatePhone(formData.phone)) errs.phone = 'Must be 10 digits';
    if (formData.alternatePhone && !validatePhone(formData.alternatePhone))
      errs.alternatePhone = 'Must be 10 digits';
    return errs;
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    updateUser(formData);          // persists via Zustand + localStorage
    setIsEditing(false);
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      alternatePhone: user?.alternatePhone || '',
      bio: user?.bio || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  // ─── view helpers ───────────────────────────────────────
  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
        <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <div>
        <p className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{value || '—'}</p>
      </div>
    </div>
  );

  // ─── render ─────────────────────────────────────────────
  return (
    <div className="pb-20 space-y-6 md:pb-6">
      {/* ── header ── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Manage your personal information</p>
        </div>
        {!isEditing ? (
          <Button variant="primary" icon={Edit} onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="primary" icon={Save} onClick={handleSave}>Save</Button>
            <Button variant="outline" icon={X} onClick={handleCancel}>Cancel</Button>
          </div>
        )}
      </div>

      {/* ── avatar + role banner ── */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* avatar circle */}
            <div className="relative">
              <div className="flex items-center justify-center shadow-lg w-28 h-28 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl">
                <span className="text-4xl font-bold text-white">
                  {(formData.name || user?.name || 'U')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </span>
              </div>
              {isEditing && (
                <button className="absolute flex items-center justify-center w-8 h-8 text-white transition-colors rounded-full shadow -bottom-2 -right-2 bg-primary-600 hover:bg-primary-700">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* name + role */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formData.name || user?.name || 'User'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{user?.email}</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3 sm:justify-start">
                <Badge variant={meta.color} size="lg">
                  <Shield className="w-3.5 h-3.5 mr-1.5" />
                  {meta.label}
                </Badge>
                <Badge variant="default" size="lg">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  Joined {user?.joinedAt ? formatDate(user.joinedAt) : 'Recently'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ── personal details (wide) ── */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} icon={User} required />
                <Input label="Email Address" name="email" value={formData.email} onChange={handleChange} error={errors.email} icon={Mail} type="email" required />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} icon={Phone} placeholder="10-digit number" />
                  <Input label="Alternate Phone" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} error={errors.alternatePhone} icon={Phone} placeholder="10-digit number" />
                </div>
                <Textarea
                  label="Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Write a short bio..."
                />
              </div>
            ) : (
              <div className="space-y-5">
                <InfoRow icon={User} label="Full Name" value={user?.name} />
                <InfoRow icon={Mail} label="Email" value={user?.email} />
                <InfoRow icon={Phone} label="Phone" value={user?.phone} />
                <InfoRow icon={Phone} label="Alternate Phone" value={user?.alternatePhone} />
                {user?.bio && (
                  <div>
                    <p className="mb-1 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">Bio</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{user.bio}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── role info sidebar ── */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role & Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 capitalize dark:text-gray-100">{user?.role}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{meta.desc}</p>
                  </div>
                </div>
              </div>

              {/* quick access links */}
              <div className="space-y-2">
                {user?.role === 'owner' && (
                  <>
                    <div className="flex items-center justify-between p-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <span className="text-gray-600 dark:text-gray-400">Properties</span>
                      <span className="font-semibold text-primary-600">3</span>
                    </div>
                    <div className="flex items-center justify-between p-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <span className="text-gray-600 dark:text-gray-400">Total Tenants</span>
                      <span className="font-semibold text-primary-600">22</span>
                    </div>
                  </>
                )}
                {user?.role === 'tenant' && (
                  <>
                    <div className="flex items-center justify-between p-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <span className="text-gray-600 dark:text-gray-400">Room</span>
                      <span className="font-semibold text-primary-600">101</span>
                    </div>
                    <div className="flex items-center justify-between p-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <span className="text-gray-600 dark:text-gray-400">Property</span>
                      <span className="font-semibold text-primary-600">Green Valley</span>
                    </div>
                  </>
                )}
                {user?.role === 'admin' && (
                  <>
                    <div className="flex items-center justify-between p-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <span className="text-gray-600 dark:text-gray-400">Properties</span>
                      <span className="font-semibold text-primary-600">5</span>
                    </div>
                    <div className="flex items-center justify-between p-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <span className="text-gray-600 dark:text-gray-400">Total Users</span>
                      <span className="font-semibold text-primary-600">34</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* activity log */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: 'Logged in', time: 'Just now' },
                  { action: 'Profile viewed', time: '2 hours ago' },
                  { action: 'Password changed', time: '3 days ago' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{item.action}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
