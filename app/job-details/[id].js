// import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
// import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
// import { useCallback, useState } from "react";

// import { COLORS, icons, SIZES } from "../../constants";
// import { useFetch } from "../../hook/useFetch";
// import {
//   Company,
//   JobAbout,
//   JobTabs,
//   ScreenHeaderBtn,
//   JobFooter,
//   Specifics,
// } from "../../components";
// import { ScrollView } from "react-native-gesture-handler";

// const tabs = ["About", "Qualifications", "Specifications"];

// export default function JobDetails() {
//   const router = useRouter();

//   const params = useGlobalSearchParams();

//   const { data, isLoading, error, refetch } = useFetch("job-details", {
//     job_id: params.id,
//   });

//   const [activeTab, setActiveTab] = useState(tabs[0]);
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     refetch();
//     setRefreshing(false);
//   }, []);

//   function displayTabContent() {
//     switch (activeTab) {
//       case "Qualifications":
//         return (
//           <Specifics
//             title="Qualifications"
//             points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
//           />
//         );

//       case "Specifications":
//         return (
//           <Specifics
//             title="Specifications"
//             points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
//           />
//         );

//       case "About":
//         return (
//           <JobAbout info={data[0].job_description ?? "No data available"} />
//         );

//       default:
//         return null;
//     }
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
//       <Stack.Screen
//         options={{
//           headerTitle: "",
//           headerStyle: { backgroundColor: COLORS.lightWhite },
//           headerBackVisible: false,
//           headerShadowVisible: false,
//           headerLeft: () => (
//             <ScreenHeaderBtn
//               dimension={"60%"}
//               iconUrl={icons.left}
//               handlePress={() => router.back()}
//             />
//           ),
//           headerRight: () => (
//             <ScreenHeaderBtn dimension={"60%"} iconUrl={icons.share} />
//           ),
//         }}
//       />
//       <>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           refreshControl={refreshing}
//           onRefresh={onRefresh}
//         >
//           {isLoading ? (
//             <ActivityIndicator color={COLORS.primary} size="large" />
//           ) : error ? (
//             <Text>Something went wrong</Text>
//           ) : data?.length === 0 ? (
//             <Text>No data available</Text>
//           ) : (
//             <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
//               <Company
//                 companyLogo={data[0].employer_logo}
//                 jobTitle={data[0].job_title}
//                 companyName={data[0].employer_name}
//                 location={data[0].job_country}
//               />
//               <JobTabs
//                 tabs={tabs}
//                 activeTab={activeTab}
//                 setActiveTab={setActiveTab}
//               />

//               {displayTabContent()}
//             </View>
//           )}
//         </ScrollView>
//         <JobFooter
//           url={
//             data[0]?.job_google_link ??
//             "https://www.google.com/about/careers/applications/jobs/results/"
//           }
//         />
//       </>
//     </SafeAreaView>
//   );
// }

import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results/"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
