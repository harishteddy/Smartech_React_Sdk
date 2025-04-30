import React, { useEffect, useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import SmartechAppInboxReact from 'smartech-appinbox-react-native'
import SmartechBaseReact from "smartech-base-react-native"



const AppInbox = () => {
    const [data, setData] = useState([]); // Initialize state for data
    // let itemObj =item


    function fetchAppInbox() {
        SmartechAppInboxReact.getAppInboxMessagesByApiCall(10, 0, [], (error, appInboxMessages) => {
            // console.log("appInboxMessages=====>", appInboxMessages)

            //ALL_MESSAGE = 0, DISMISS_MESSAGE = 1, READ_MESSAGE = 2, UNREAD_MESSAGE =3

            SmartechAppInboxReact.getAppInboxMessages("all", (error, appInboxMessages) => {
                console.log("appInboxMessages", appInboxMessages)
                setData(appInboxMessages); // Set the fetched data to state
                data.map((item) => {
                    console.log("item.title", item.title)
                })
            });

            SmartechAppInboxReact.getAppInboxCategoryList((error, categoryList) => {
                let categoryListData = categoryList
                console.log("categoryListData", categoryListData)

            });




        });

    }
    useEffect(() => {
        // SmartechBaseReact.trackEvent("Login_Screen", payloadata);
        fetchAppInbox()

    }, [])

    function onClick(trid, deeplink) {
        console.log("hello");
        SmartechAppInboxReact.markMessageAsClicked(trid, deeplink) //deeplink and trid of the Appinboxmessage
        Linking.openURL(deeplink);
        console.log("trid", trid, "deeplink", deeplink);
    }


    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ padding: 20 }}>notifications</Text>
            <View>
                {
                    data.map((item, index) => (
                        <View key={index} >
                            <TouchableOpacity style={{ height: 30, backgroundColor: "white", borderWidth: 1, marginBottom: 40, justifyContent: "center" }} onPress={()=>{onClick(item.trid, item.deeplink)}}>

                                <Text style={{ color: "black", padding: 5 }}>{item.title}</Text>

                            </TouchableOpacity>
                        </View>

                    ))
                }
            </View>


        </View>
    )
}

export default AppInbox