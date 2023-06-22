/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
// import {Text} from 'react-native';
import MainContainer from './components/Container';
import SmallText from './components/Texts/SmallText';
import RegulatText from './components/Texts/RegularText';
import BigText from './components/Texts/BigText';
import {
  Linking,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import {colors} from './components/colors';
// import Icon from '@ant-design/icons/lib/components/AntdIcon';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AntIcon from "react-native-vector-icons/AntDesign";
import DatePicker from 'react-native-date-picker';

const {primary, warning, danger} = colors;
const jobtype = ['programmer', 'data', 'network', 'cyber security'];

const styles = StyleSheet.create({
  base: {
    backgroundColor: primary,
  },
  title: {
    color: danger,
    fontSize: 30,
    fontWeight: '800',
  },
  titleVariant: {
    color: warning,
    fontSize: 30,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  navbar: {
    backgroundColor: primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 20,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderColor: warning,
    flex: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  filterBtn: {
    margin: 10,
  },
  btn: {
    flex: 1,
    padding: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: warning,
    flex: 1,
    width: 160,
    height: 30,
  },
  btndate: {
    flex: 1,
    padding: 10,
  },
  dateinfo: {
    flex: 1,
  },
  appinfo: {
    flex: 1,
    textAlign: 'right',
  },
  pagination: {
    alignItems: 'flex-end',
  },
  paginationDropdown: {
    backgroundColor: warning,
    borderRadius: 30,
    width: 80,
    height: 30,
  },
});

export default function App() {
  const [jobs, setJobs] = useState({});
  const [isFilter, setIsFilter] = useState(false);
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<number[]>([]);
  const [jobType, setJobType] = useState('programmer');
  const [date, setDate] = useState(new Date());
  const [isPickDate, SetIsPickDate] = useState(false);
  const [dateLabel, setDateLabel] = useState('Date');
  const [isFiltered, setIsFiltered] = useState(false);

  const getJobs = async () => {
    axios.get('http://10.0.2.2:8000/api/job/' + page).then(response => {
      setJobs(response.data.data);
      if (page === 1) {
        pageList(response.data.maxPage);
      }
      setIsLoading(false);
    });
  };

  const postFilter = async () => {
    if (dateLabel === 'Date') {
      axios
        .post('http://10.0.2.2:8000/api/job-filter/' + page, {
          type: jobType.replace(/\s/g, ''),
          date: '',
          location: location,
          company: company,
        })
        .then(response => {
          setJobs(response.data.data);
          pageList(response.data.maxPage);
          setIsFiltered(true);
          setIsLoading(false);
        });
    } else {
      axios
        .post('http://10.0.2.2:8000/api/job-filter/' + page, {
          type: jobType.replace(/\s/g, ''),
          date: dateLabel,
          location: location,
          company: company,
        })
        .then(response => {
          setJobs(response.data.data);
          pageList(response.data.maxPage);
          setIsFiltered(true);
          setIsLoading(false);
        });
    }
  };

  const pageList = max => {
    const tempList: number[] = [];
    for (let i = 0; i < max; i++) {
      tempList.push(i + 1);
    }
    setPages(tempList);
  };

  useEffect(() => {
    setIsLoading(true);
    getJobs();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (isFiltered) {
      postFilter();
    } else {
      getJobs();
    }
  }, [page]);

  return (
    <ScrollView style={styles.base}>
      <View style={styles.navbar}>
        <Text style={styles.title}>
          <Text style={styles.titleVariant}>IT</Text> JOBS
        </Text>
      </View>
      <MainContainer>
        {isFilter ? (
          <View>
            <View style={styles.row}>
              <View style={styles.btndate}>
                <SelectDropdown
                  data={jobtype}
                  defaultButtonText="programmer"
                  buttonTextAfterSelection={selected => {
                    setJobType(selected);
                    return selected;
                  }}
                  rowTextForSelection={option => {
                    return option;
                  }}
                  buttonStyle={styles.dropdown}
                />
              </View>
              <View style={styles.btndate}>
                <Button
                  title={dateLabel}
                  color={warning}
                  onPress={() => SetIsPickDate(true)}
                />
              </View>
              <DatePicker
                mode="date"
                modal
                open={isPickDate}
                date={date}
                textColor={warning}
                onConfirm={selected => {
                  SetIsPickDate(false);
                  setDateLabel(new Date(selected).toISOString().split('T')[0]);
                }}
                onCancel={() => {
                  SetIsPickDate(false);
                }}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                onChangeText={e => setLocation(e)}
                value={location}
                placeholder="Location"
              />
              <TextInput
                style={styles.input}
                onChangeText={e => setCompany(e)}
                value={company}
                placeholder="Company"
              />
            </View>
            <View style={styles.row}>
              <View style={styles.btn}>
                <Button
                  title="Cancle"
                  color="#FF1F57"
                  onPress={() => {
                    setIsFilter(false);
                    setIsLoading(true);
                    setDateLabel('Date');
                    setJobType('programmer');
                    setCompany('');
                    setLocation('');
                    getJobs();
                  }}
                />
              </View>
              <View style={styles.btn}>
                <Button
                  title="Search"
                  color="#ED8F18"
                  onPress={() => {
                    setPage(1);
                    setIsLoading(true);
                    postFilter();
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.filterBtn}>
            <Button
              title="Filter"
              color="#ED8F18"
              onPress={() => setIsFilter(true)}
            />
          </View>
        )}

        {isLoading ? (
          <ActivityIndicator size="large" color={danger} />
        ) : (
          <View>
            {Object.values(jobs).map((data, idx) => {
              return (
                <View style={styles.item} key={idx}>
                  <BigText
                    style={styles.title}
                    onPress={() => Linking.openURL(data.link)}>
                    {data.title}
                  </BigText>
                  <RegulatText>{data.company}</RegulatText>
                  <SmallText>({data.location})</SmallText>
                  <View style={styles.row}>
                    <Text style={styles.dateinfo}>
                      {new Date(data.date).toISOString().split('T')[0]}
                    </Text>
                    <RegulatText style={styles.appinfo}>
                      {data.source}
                    </RegulatText>
                  </View>
                </View>
              );
            })}
            <View style={styles.pagination}>
              <SelectDropdown
                data={pages}
                defaultButtonText="1"
                buttonTextAfterSelection={selected => {
                  // changePage(selected);
                  setPage(selected);
                  return selected;
                }}
                rowTextForSelection={option => {
                  return option;
                }}
                buttonStyle={styles.paginationDropdown}
              />
            </View>
          </View>
        )}
      </MainContainer>
    </ScrollView>
  );
}
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import Hello from './components/hello';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
