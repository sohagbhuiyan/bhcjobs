// Root index — open the main Tabs layout as app root
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(tabs)" />;
}
