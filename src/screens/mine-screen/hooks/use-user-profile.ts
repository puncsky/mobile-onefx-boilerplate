import { useQuery } from "@apollo/client";
import { userProfile } from "@/screens/mine-screen/data/query";
import { UserProfile } from "@/screens/mine-screen/data/__generated__/UserProfile";

export const useUserProfile = (userId: string) => {
  const { data, error, loading } = useQuery<UserProfile>(userProfile, {
    variables: { userId }
  });
  return {
    email:
      data && data.userProfile && data.userProfile.email
        ? data.userProfile.email
        : "",
    error,
    loading
  };
};
