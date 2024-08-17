import AppLoading from "expo-app-loading";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { useSession } from "lib/ctx";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const { session, loading } = useSession();
  if (loading) {
    return null;
  }
  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session && !loading) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
