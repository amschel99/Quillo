import { JSX } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import AccountSelectionScreen from "../screens/AccountSelectionScreen";
import HomeScreen from "../screens/HomeScreen";
/**company */
import CompanyHomeScreen from "../screens/company/CompanyHome";
import CompanyProfileScreen from "../screens/company/CompanyProfile";
import CreateCompanyScreen from "../screens/company/CreateCompanyScreen";
import UpdateCompanyScreen from "../screens/company/UpdateCompanyScreen";
/**investor */
import BuySharesScreen from "../screens/investor/BuySharesScreen";
import InvestorHomeScreen from "../screens/investor/InvestorHomeScreen";
import SearchScreen from "../screens/investor/SearchScreen";
import CompanyDetailsScreen from "../screens/investor/CompanyDetailsScreen";

export type RootStackParamList = {
  splash: undefined;
  accountselection: undefined;
  createcompany: undefined;
  companyhome: undefined;
  mycompanyprofile: undefined;
  updatecompanyprofile: undefined;
  searchcompanies: undefined;
  investorHomeScreen: undefined;
  companyDetailsScreen: { companyId: string | null };
  buyshares: undefined;
  home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
        animationTypeForReplace: "pop",
      }}
    >
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen
        name="accountselection"
        component={AccountSelectionScreen}
      />
      <Stack.Screen name="companyhome" component={CompanyHomeScreen} />
      <Stack.Screen name="createcompany" component={CreateCompanyScreen} />
      <Stack.Screen name="mycompanyprofile" component={CompanyProfileScreen} />
      <Stack.Screen
        name="updatecompanyprofile"
        component={UpdateCompanyScreen}
      />
      <Stack.Screen name="searchcompanies" component={SearchScreen} />
      <Stack.Screen name="investorHomeScreen" component={InvestorHomeScreen} />
      <Stack.Screen name="buyshares" component={BuySharesScreen} />
      <Stack.Screen
        name="companyDetailsScreen"
        component={CompanyDetailsScreen}
        initialParams={{ companyId: null }}
      />
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
