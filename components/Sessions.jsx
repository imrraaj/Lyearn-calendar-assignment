import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, FlatList } from "react-native";
import { useCTX } from "../context/appContext";
import TitleText from "./TitleText";
import ParagraphText from "./ParagraphText"
import LoadingState from "./LoadingState";
import Chip from "./Chip";
import constants from "../staticData/constants"


import { Calendar } from "react-native-calendars";
import { ModalContent, BottomModal } from "react-native-modals";
import Checkbox from 'expo-checkbox';

import PeopleIcon from "../assets/images/People.svg";
import SeatsIcon from "../assets/images/Seats.svg";
import FilledSeatsIcon from "../assets/images/SeatsFilled.svg"
import CircleIcon from "../assets/images/Circle.svg"








function CheckBoxItem({ value, setFilterThroughArray, filterThroughArray }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const { ctxObj } = useCTX();

    return (
        <Checkbox
            style={styles.checkbox}
            value={toggleCheckBox || filterThroughArray.has(value)}
            onValueChange={() => {

                //toggle the checkbox
                setToggleCheckBox(!toggleCheckBox);
                if (toggleCheckBox) {

                    // if the value is in the filterThroughArray state then remove it
                    setFilterThroughArray(prev => new Set([...prev].filter(x => x !== value)))
                } else {
                    // if the value is not in the filterThroughArray state then add it
                    setFilterThroughArray(prev => new Set(prev.add(value)))
                }
            }}
            color={ctxObj.theme.secondary}
        />
    )
}

function Event({ eventObj, lastChild }) {

    function StatusElement({ eventObj }) {

        // if event is upcoming then show the seats left and people registered
        if (eventObj.status == constants.UPCOMING) {

            return (<View style={styles.upcomingContainer}>
                <View style={styles.layoutHorizontal}>

                    <PeopleIcon style={{ marginRight: 14 }} />
                    <ParagraphText
                        color={ctxObj.theme.secondary}
                        style={{ marginRight: 18 }}>

                        {eventObj.registered}
                    </ParagraphText>
                </View>

                <View style={styles.layoutHorizontal}>
                    <SeatsIcon
                        style={{
                            marginRight: 14,
                            color: eventObj.seats_left > 10
                                ? ctxObj.theme.iconSeconadry
                                : ctxObj.theme.iconWarningLight
                        }}
                    />
                    <ParagraphText color={ctxObj.theme.secondary}>
                        {eventObj.seats_left} left
                                </ParagraphText>
                </View>
            </View>)
        }

        // if event is upcoming and booked sow it
        if (eventObj.status == constants.BOOKED) {
            return (<View>
                <View style={styles.upcomingContainer}>
                    <FilledSeatsIcon
                        style={{ marginRight: 14 }} />
                    <ParagraphText color={ctxObj.theme.secondary}>No seats</ParagraphText>
                </View>
            </View>)
        }

        // else show the status in the chip
        else {
            return (<View style={{
                marginTop: 16,
            }}>
                <Chip
                    chipText={eventObj.status.toString().toUpperCase()}
                    color={eventObj.status === constants.FINISHED ? ctxObj.theme.secondary : ctxObj.theme.tertiary}
                    chipBg={eventObj.status === constants.FINISHED ? "" : ctxObj.theme.bgInfo}
                    isBold={true}
                />
            </View>)
        }
    }

    const { ctxObj } = useCTX();


    return (

        <View style={[styles.eventCard, { borderBottomWidth: lastChild ? 0 : 1, paddingBottom: lastChild ? 0 : 24 }]}>


            <Image source={eventObj.img_url} style={styles.eventImg} />


            <View style={styles.eventCard__desc}>

                <TitleText size={16}
                    style={{ color: ctxObj.theme.paragraph, lineHeight: 22, marginBottom: 6 }}>
                    {eventObj.title}
                </TitleText>

                <View style={styles.eventBody}>

                    <ParagraphText size={16} color={ctxObj.theme.secondary}>
                        {eventObj.time}
                    </ParagraphText>

                    <View style={styles.circleIcon}>
                        <CircleIcon />
                    </View>

                    <ParagraphText size={16} color={ctxObj.theme.secondary}>
                        {eventObj.duration}
                    </ParagraphText>

                </View>

                <StatusElement eventObj={eventObj} />
            </View>
        </View>
    )
}


export default function AllSessions({ sessionSelected }) {

    const { ctxObj, data } = useCTX();


    const [selectedFilter, setSelectedFilter] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filterThroughArray, setFilterThroughArray] = useState(new Set([]));
    const [isFetched, setIsfetched] = useState(false); // for mocking an API
    const [selectedDay, setSelectedDay] = useState(); // selected Day on calendar
    const [eventDates, setEventDates] = useState(data.map(d => d.date.toISOString().replace(/T.*/, '').split('-').join('-')).reduce((o, key) => Object.assign(o, { [key]: { customStyles: styles.customStyles } }), {}));
    let idx = 0;


    // to load initially and
    //load whenever the session changes
    useEffect(() => {
        //simulates the fetch api call
        // we can store it into state in our context to avoid re-fetching the data
        setIsfetched(false);
        let interval = setInterval(() => {
            setIsfetched(true);
        }, 1000);
        setFilteredData(sessionSelected == constants.ALL_SESSIONS ? data : filterTheData(data, new Set([constants.REGISTERED])));
        return () => { clearTimeout(interval) };
    }, [sessionSelected]);



    // function to filter the data from filterThroughArray set
    function filterTheData(data, filterThroughArray) {
        let filteredArray = data
            .filter((element) =>
                element.events.some((subElement) => {
                    if (subElement.status === constants.UPCOMING) {
                        return ((filterThroughArray.has(constants.FAST) && subElement.seats_left < 10) || (filterThroughArray.has(constants.AVAILABLE) && subElement.seats_left >= 10))
                    } else {
                        return (filterThroughArray.has(subElement.status));
                    }
                }))
            .map(element => {
                return Object.assign({}, element, { events: element.events.filter(subElement => filterThroughArray.has(subElement.status === constants.UPCOMING ? (subElement.seats_left > 10 ? constants.AVAILABLE : constants.FAST) : subElement.status)) });
            });

        return filteredArray;
    }


    return (
        <View style={{ marginBottom: 40 }}>
            {!isFetched ? <LoadingState /> :
                <>
                    <ScrollView horizontal={true} style={styles.container}>

                        <View style={styles.chipContainer}>
                            <TouchableOpacity onPress={() => setSelectedFilter(constants.DATE)}>
                                <Chip
                                    chipText="Date"
                                    isSelected={selectedDay}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setSelectedFilter(constants.SEATS)}>
                                <Chip
                                    chipText="Seats"
                                    isSelected={filterThroughArray.size}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setSelectedFilter(constants.INSTRUCTOR)}>
                                <Chip
                                    chipText="Instructor"
                                    isSelected={selectedFilter === constants.INSTRUCTOR}
                                />
                            </TouchableOpacity>
                        </View>

                    </ScrollView>

                    <View style={styles.eventsContainer}>
                        {/* showing the filtered results */}
                        {/* Flatlist can be used also */}
                        {
                            filteredData.length ?
                                filteredData.map(d => {
                                    idx = 0;
                                    return (
                                        <View key={d.date.toDateString()}>
                                            <TitleText style={styles.date} size={18}>
                                                {d.date.toDateString()}
                                            </TitleText>
                                            <View>
                                                {d.events.map(e => {
                                                    idx++;
                                                    return <Event isFetched={isFetched} eventObj={e} key={e.title} lastChild={d.events.length == idx} />
                                                })}
                                            </View>
                                        </View>
                                    )
                                }
                                ) :
                                <View>
                                    {/* render text if nothing to show */}
                                    <TitleText size={18} style={{ color: "#999999", marginTop: 40, paddingHorizontal: 24, lineHeight: 26 }}>No sessions scheduled on {new Date(selectedDay).toDateString()} onwards</TitleText>
                                </View>
                        }
                    </View>




                    {/* Bottom modal for Seats Filter */}
                    <BottomModal
                        visible={selectedFilter == constants.SEATS}
                        onTouchOutside={() => setSelectedFilter(0)}
                        width={1}
                        onSwipeOut={() => setSelectedFilter(0)}
                        modalStyle={{
                            borderRadius: 18,
                        }}
                    >
                        <View style={styles.seatsFilterBar}></View>
                        <ModalContent>
                            <View style={styles.seatsFilterSection}>
                                <View style={styles.seatsFilterLabel}>

                                    <View style={[styles.seatsFilterIcon, { backgroundColor: "#FBBF24" }]}></View>
                                    <ParagraphText size={14} color={ctxObj.theme.secondary}>Filling Fast</ParagraphText>
                                </View>
                                <View>
                                    <CheckBoxItem value={constants.FAST} setFilterThroughArray={setFilterThroughArray} filterThroughArray={filterThroughArray} />
                                </View>
                            </View>



                            <View style={styles.seatsFilterSection}>
                                <View style={styles.seatsFilterLabel}>
                                    <View style={[styles.seatsFilterIcon, { backgroundColor: "#4C98FB", }]}></View>
                                    <ParagraphText size={14} color={ctxObj.theme.secondary}> Available </ParagraphText>
                                </View>
                                <View>
                                    <CheckBoxItem value={constants.AVAILABLE} setFilterThroughArray={setFilterThroughArray} filterThroughArray={filterThroughArray} />
                                </View>
                            </View>


                            <View style={styles.seatsFilterSection}>
                                <View style={styles.seatsFilterLabel}>
                                    <View style={[styles.seatsFilterIcon, { backgroundColor: "#999999", }]}></View>
                                    <ParagraphText size={14} color={ctxObj.theme.secondary}>Booked</ParagraphText>
                                </View>
                                <View>
                                    <CheckBoxItem value={constants.BOOKED} setFilterThroughArray={setFilterThroughArray} filterThroughArray={filterThroughArray} />
                                </View>
                            </View>



                            <TouchableOpacity style={[styles.btn, {
                                backgroundColor: ctxObj.theme.primary,
                            }]}
                                onPress={() => {
                                    if (sessionSelected == constants.MY_SESSIONS) {

                                        if (filterThroughArray.size == 0) {
                                            let ans = filterTheData(data, new Set([constants.REGISTERED]));
                                            setFilteredData(ans);
                                        }
                                        else {
                                            // because status is always going to be registed and pop up doen;t have any opt for Registered
                                            setFilteredData([])
                                        }
                                    }
                                    else if (sessionSelected == constants.ALL_SESSIONS && filterThroughArray.size > 0) {
                                        let ans = filterTheData(data, filterThroughArray);
                                        setFilteredData(ans);
                                    } else {
                                        setFilteredData(data);
                                    }
                                    setSelectedFilter(null)
                                }}
                            >
                                <TitleText style={{ color: "#ffffff" }}>Save</TitleText>
                            </TouchableOpacity>
                        </ModalContent>

                    </BottomModal>



                    {/* Bottom modal for calender */}
                    <BottomModal
                        visible={selectedFilter == constants.DATE}
                        onTouchOutside={() => setSelectedFilter(null)}
                        width={1}
                        onSwipeOut={() => setSelectedFilter(null)}
                        modalStyle={{
                            borderRadius: 18,
                        }}
                    >
                        <ModalContent>

                            <Calendar
                                current={selectedDay ? selectedDay : new Date().toISOString().replace(/T.*/, '').split('-').join('-')}
                                onDayPress={day => {
                                    //if user press twice filter is removed
                                    if (day.dateString == selectedDay) {
                                        setSelectedDay('');
                                    }
                                    else {
                                        setSelectedDay(day.dateString);
                                    }
                                }}
                                markingType={'custom'}
                                markedDates={{ ...eventDates, [selectedDay]: { customStyles: styles.customSelectedStyles } }}
                                theme={{
                                    textSectionTitleColor: '#b6c1cd',
                                    textSectionTitleDisabledColor: '#d9e1e8',
                                    selectedDayBackgroundColor: "#BFBFBF",
                                    todayTextColor: '#ffffff',
                                    todayBackgroundColor: "#000000",
                                    arrowColor: '#000000',
                                    disabledArrowColor: '#efefef',
                                    monthTextColor: '#000000',
                                    indicatorColor: '#000000',
                                    textDayFontFamily: ctxObj.font.normal,
                                    textMonthFontFamily: ctxObj.font.normal,
                                    textDayHeaderFontFamily: ctxObj.font.bold,
                                    textDayFontSize: 14,
                                    textMonthFontSize: 14,
                                    textDayHeaderFontSize: 14,
                                }}
                            />


                            <TouchableOpacity style={[styles.btn, {
                                backgroundColor: ctxObj.theme.primary,
                            }]}

                                onPress={() => {

                                    //if my session is selected and user has entered a date then filter the registered and then filter according to the date
                                    if (sessionSelected == constants.MY_SESSIONS && selectedDay) {
                                        let arr = filterTheData(data, new Set([constants.REGISTERED]));
                                        let ans = arr.filter(d => d.date.toISOString().replace(/T.*/, '').split('-').join('-') === selectedDay);
                                        setFilteredData(ans);
                                    }
                                    // if my session is selected and user has not entered any date then filter the registered
                                    else if (sessionSelected == constants.MY_SESSIONS && !selectedDay) {
                                        let ans = filterTheData(data, new Set([constants.REGISTERED]));
                                        setFilteredData(ans);
                                    }
                                    // if all sessions is selscted and user has entered a date then filter according to the date
                                    else if (selectedDay) {
                                        let ans = data.filter(d => d.date.toISOString().replace(/T.*/, '').split('-').join('-') === selectedDay);
                                        setFilteredData(ans);
                                    }
                                    // if all sessions is selscted and user has not entered a date then return the data
                                    else {
                                        setFilteredData(data);
                                    }
                                    setSelectedFilter(null)

                                }}
                            >
                                <TitleText style={{ color: "#ffffff" }}>Select Date</TitleText>
                            </TouchableOpacity>
                        </ModalContent>
                    </BottomModal>
                </>}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
    },
    chipContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 32,
    },
    eventCard: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderColor: "#EAEAEA",
        paddingVertical: 24,
        marginHorizontal: 16,
    },
    eventImg: {
        marginRight: 16,
        paddingLeft: 16,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    eventCard__desc: {
        flex: 1,
    },
    eventBody: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    circleIcon: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginHorizontal: 6
    },
    upcomingContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 12,
    },

    layoutHorizontal: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"

    },
    seatsFilterBar: {
        marginTop: 16,
        backgroundColor: "#EAEAEA",
        height: 6,
        width: 42,
        alignSelf: "center",
        borderRadius: 4,
    },
    seatsFilterSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 26,
    },
    seatsFilterLabel: {
        flexDirection: "row",
        alignItems: "center",
    },
    seatsFilterIcon: {
        height: 10,
        width: 10,
        backgroundColor: "#FBBF24",
        borderRadius: 2,
        marginRight: 12
    },
    btn: {
        borderRadius: 24,
        paddingVertical: 12,
        justifyContent: "center",
        marginTop: 28,
        alignItems: "center",
    },
    date: {
        paddingHorizontal: 24,
        marginTop: 46,
        marginBottom: 40,
    },
    customStyles: {
        container: {
            borderWidth: 1,
            borderColor: "#BFBFBF",
        },
    },
    customSelectedStyles: {
        container: {
            backgroundColor: "#BFBFBF",
        }
    },
    checkbox: {
        height: 18,
        width: 18,
    },
});