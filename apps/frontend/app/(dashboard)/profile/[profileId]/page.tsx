"use server"
// ProfilePage.jsx
import UploadCard from '../../../component/UploadCard/UploadCard';
import StatsCard from '../../../component/StatsCard/StatsCard';
import ProfileHeader from '../../../component/ProfileHeader/ProfileHeader';
import { DocumentSection } from '../../../component/DocumentSection/DocumentSection';
import { getServerSession } from 'next-auth';
import { getUserDetails } from '../../../lib/actions/Notes';
import { AUTH_OPTIONS } from '../../../lib/auth';

export default async function ProfilePage({params}) {
  const session = await getServerSession(AUTH_OPTIONS);
  const { profileId } = params; 
  const isSameUser = (profileId===session.user?.userId);
  const user = await getUserDetails(profileId);
  return (
    <div className={`min-h-screen transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto py-8 px-4">
        
        {/* Profile Header */}
        <ProfileHeader user={isSameUser ? session?.user : user} isSameUser={isSameUser} />
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Upload Section */}
          <div className="md:col-span-1">
            {isSameUser && <UploadCard />}
            
            {/* Stats Card */}
            <StatsCard notes={user.notes} papers={user.papers} />
          </div>
          
          {/* Right Column - Documents Section */}
          <div className="md:col-span-2">
              <DocumentSection notes={user.notes} papers={user.papers} isSameUser={isSameUser}/>
          </div>
        </div>
      </div>
    </div>
  );
}