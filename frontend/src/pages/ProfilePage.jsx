import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, Pencil, User } from "lucide-react";
import { toast } from "sonner";
import Loading from "../components/Loading";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    profilePic: authUser?.profilePic || "",
  });

  const handleImageUpload = async (e) => {
    setIsEditing(true);
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      setSelectedImg(file);
    }

    if (fileInputRef.current){
      fileInputRef.current.value = "";
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("fullName", formData.fullName);
    if (selectedImg) {
      formDataObj.append("profilePic", selectedImg); //This is a file
    }

    try {
      await updateProfile(formDataObj);
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedImg(null);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    setFormData({
      fullName: authUser?.fullName || "",
      profilePic: authUser?.profilePic || "",
    });
  }, [authUser]);

  return (
    <div className="h-screen pt-20">
      {isUpdatingProfile ? <Loading /> : <></>}
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">
              {isEditing ? "Editing" : "Profile"}
            </h1>
            <p className="mt-2">
              {isEditing
                ? "You are now editing your profile information"
                : "Your account information "}
            </p>
          </div>

          {/*  Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={
                  selectedImg
                    ? URL.createObjectURL(selectedImg)
                    : formData.profilePic || "/avatar.png"
                }
                alt="Profile"
                className="size-32 rounded-full object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105 cursor-pointer
                  p-2 rounded-full 
                  transition-all duration-300
                  ${
                    isUpdatingProfile
                      ? "animate-pulse duration-500 pointer-events-none"
                      : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading new profile picture..."
                : "Click the camera icon to upload a new photo."}
            </p>
          </div>
          {/* User Info */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <input
                type="text"
                className={`input input-bordered w-full pl-4 focus:outline-0`}
                placeholder="Enter your name"
                value={authUser?.email}
                disabled
              />
            </div>

            <form onSubmit={handleSaveChanges}>
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-4 focus:outline-0`}
                  placeholder="Enter your name"
                  value={formData.fullName}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
              {isEditing ? (
                <div className="flex justify-center md:justify-end mt-4">
                  <div className="flex flex-col-reverse md:flex-row md:gap-2">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setSelectedImg(null);
                        setFormData({
                          fullName: authUser?.fullName || "",
                          profilePic: authUser?.profilePic || "",
                        });
                      }}
                      type="button"
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn"
                      disabled={
                        formData.fullName === authUser?.fullName && !selectedImg
                      }
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </form>
            {!isEditing && (
              <div className="flex justify-center md:justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="btn flex items-center gap-2"
                >
                  <Pencil className="size-4" /> Edit profile
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
