import { Text, View, TextInput, StyleSheet, useColorScheme, TouchableOpacity, Platform, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateTrade() {

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [stockName, setStockName] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [pnl, setPnl] = useState<string>('');
    const [leverage, setLeverage] = useState<string>('');
    const [positive, setPositive] = useState<boolean>(true);
    const [dateObject, setDateObject] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>('');
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

    const [apiUrl, setApiUrl] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        // @ts-ignore
        const hostUri = Constants.expoConfig.hostUri;
        const ipAddress = hostUri ? hostUri.split(":")[0] : null;

        // hardcode the port number form API
        const apiPort = "8080";

        const tempURL = ipAddress ? `http://${ipAddress}:${apiPort}` : null;
        // @ts-ignore
        setApiUrl(tempURL);

        (async () => {
            const storedUserId = await AsyncStorage.getItem("userId");
            setUserId(storedUserId ?? "");
        })();

    }, []);

    console.log(userId)

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDateObject(selectedDate);
        }
    };

    const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date): void => {
        setShowTimePicker(Platform.OS === 'ios');
        if (selectedTime) {
            const newDate = new Date(dateObject);
            newDate.setHours(selectedTime.getHours());
            newDate.setMinutes(selectedTime.getMinutes());
            setDateObject(newDate);
        }
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const createTrade = () => {

        const date = dateObject.toString();
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                stockName,
                amount: parseFloat(amount),
                pnl: parseFloat(pnl),
                leverage: parseFloat(leverage),
                positive,
                date,
                description,
                userId
            }),
        }

        fetch(`${apiUrl}/trades`, requestOptions)
            .then((res) => {
                console.log("Trade Created: ", res)
            })
            .catch((e) => {
                console.log("Error: ", e)
            })

        // reset values
        setStockName("");
        setAmount("");
        setPnl("");
        setLeverage("");
        setDescription("")
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: 32,
        },
        containerLight: {
            backgroundColor: '#FFFFFF',
        },
        containerDark: {
            backgroundColor: '#131722',
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 24,
            letterSpacing: 0.5,
        },
        titleLight: {
            color: '#2A2E39',
        },
        titleDark: {
            color: '#FFFFFF',
        },
        formCard: {
            borderRadius: 8,
            padding: 20,
            borderWidth: 1,
        },
        formCardLight: {
            backgroundColor: '#F8F9FD',
            borderColor: '#E0E3EB',
        },
        formCardDark: {
            backgroundColor: '#1E222D',
            borderColor: '#2A2E39',
        },
        fieldContainer: {
            marginBottom: 20,
        },
        label: {
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 8,
            letterSpacing: 0.3,
        },
        labelLight: {
            color: '#5D667B',
        },
        labelDark: {
            color: '#9598A1',
        },
        input: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 6,
            borderWidth: 1,
        },
        inputLight: {
            backgroundColor: '#FFFFFF',
            borderColor: '#E0E3EB',
            color: '#2A2E39',
        },
        inputDark: {
            backgroundColor: '#131722',
            borderColor: '#2A2E39',
            color: '#D1D4DC',
        },
        textArea: {
            minHeight: 100,
            paddingTop: 12,
        },
        radioContainer: {
            flexDirection: 'row',
            gap: 12,
        },
        radioButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 6,
            borderWidth: 1,
        },
        radioButtonLight: {
            backgroundColor: '#FFFFFF',
            borderColor: '#E0E3EB',
        },
        radioButtonDark: {
            backgroundColor: '#131722',
            borderColor: '#2A2E39',
        },
        radioButtonActive: {
            borderWidth: 2,
        },
        radioButtonPositive: {
            borderColor: '#26A69A',
        },
        radioButtonNegative: {
            borderColor: '#EF5350',
        },
        radioCircle: {
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            marginRight: 8,
            justifyContent: 'center',
            alignItems: 'center',
        },
        radioCircleLight: {
            borderColor: '#9598A1',
        },
        radioCircleDark: {
            borderColor: '#5D667B',
        },
        radioCircleInnerPositive: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#26A69A',
        },
        radioCircleInnerNegative: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#EF5350',
        },
        radioText: {
            fontSize: 16,
            fontWeight: '500',
        },
        radioTextLight: {
            color: '#5D667B',
        },
        radioTextDark: {
            color: '#9598A1',
        },
        radioTextPositive: {
            color: '#26A69A',
        },
        radioTextNegative: {
            color: '#EF5350',
        },
        dateTimeContainer: {
            flexDirection: 'row',
            gap: 12,
        },
        dateTimeButton: {
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 6,
            borderWidth: 1,
            justifyContent: 'center',
        },
        dateTimeText: {
            fontSize: 16,
        },
        dateTimeTextLight: {
            color: '#2A2E39',
        },
        dateTimeTextDark: {
            color: '#D1D4DC',
        },
        button: {
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 24,
            borderWidth: 1,
        },
        buttonLight: {
            backgroundColor: '#2962FF',
            borderColor: '#2962FF',
        },
        buttonDark: {
            backgroundColor: '#2962FF',
            borderColor: '#1E4FCC',
        },
        buttonText: {
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 0.5,
        },
        buttonTextLight: {
            color: '#FFFFFF',
        },
        buttonTextDark: {
            color: '#FFFFFF',
        },
    });

    return (
        <ScrollView>
        <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
            <Text style={[styles.title, isDark ? styles.titleDark : styles.titleLight]}>
                Log Trade
            </Text>

            <View style={[styles.formCard, isDark ? styles.formCardDark : styles.formCardLight]}>
                <View style={styles.fieldContainer}>
                    <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                        Name of Stock/Coin/Future
                    </Text>
                    <TextInput
                        style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                        placeholder="e.g., BTC, AAPL, ES"
                        placeholderTextColor={isDark ? '#5D667B' : '#9598A1'}
                        value={stockName}
                        onChangeText={setStockName}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                        Amount
                    </Text>
                    <TextInput
                        style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                        placeholder="Enter amount"
                        placeholderTextColor={isDark ? '#5D667B' : '#9598A1'}
                        keyboardType="decimal-pad"
                        value={amount}
                        onChangeText={setAmount}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                        PnL
                    </Text>
                    <TextInput
                        style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                        placeholder="Profit/Loss"
                        placeholderTextColor={isDark ? '#5D667B' : '#9598A1'}
                        keyboardType="decimal-pad"
                        value={pnl}
                        onChangeText={setPnl}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                        Leverage Used
                    </Text>
                    <TextInput
                        style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                        placeholder="e.g., 10x"
                        placeholderTextColor={isDark ? '#5D667B' : '#9598A1'}
                        keyboardType="decimal-pad"
                        value={leverage}
                        onChangeText={setLeverage}
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                        Trade Result
                    </Text>
                    <View style={styles.radioContainer}>
                        <TouchableOpacity
                            style={[
                                styles.radioButton,
                                positive && styles.radioButtonActive,
                                positive && styles.radioButtonPositive,
                                isDark ? styles.radioButtonDark : styles.radioButtonLight
                            ]}
                            onPress={() => setPositive(true)}
                        >
                            <View style={[
                                styles.radioCircle,
                                isDark ? styles.radioCircleDark : styles.radioCircleLight
                            ]}>
                                {positive && <View style={styles.radioCircleInnerPositive} />}
                            </View>
                            <Text style={[
                                styles.radioText,
                                positive && styles.radioTextPositive,
                                isDark ? styles.radioTextDark : styles.radioTextLight
                            ]}>
                                Positive
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.radioButton,
                                !positive && styles.radioButtonActive,
                                !positive && styles.radioButtonNegative,
                                isDark ? styles.radioButtonDark : styles.radioButtonLight
                            ]}
                            onPress={() => setPositive(false)}
                        >
                            <View style={[
                                styles.radioCircle,
                                isDark ? styles.radioCircleDark : styles.radioCircleLight
                            ]}>
                                {!positive && <View style={styles.radioCircleInnerNegative} />}
                            </View>
                            <Text style={[
                                styles.radioText,
                                !positive && styles.radioTextNegative,
                                isDark ? styles.radioTextDark : styles.radioTextLight
                            ]}>
                                Negative
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                        Date & Time
                    </Text>
                    <View style={styles.dateTimeContainer}>
                        <TouchableOpacity
                            style={[styles.dateTimeButton, isDark ? styles.inputDark : styles.inputLight]}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={[styles.dateTimeText, isDark ? styles.dateTimeTextDark : styles.dateTimeTextLight]}>
                                {formatDate(dateObject)}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.dateTimeButton, isDark ? styles.inputDark : styles.inputLight]}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Text style={[styles.dateTimeText, isDark ? styles.dateTimeTextDark : styles.dateTimeTextLight]}>
                                {formatTime(dateObject)}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={dateObject}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}

                    {showTimePicker && (
                        <DateTimePicker
                            value={dateObject}
                            mode="time"
                            display="default"
                            onChange={onTimeChange}
                        />
                    )}
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                        Description of Trade
                    </Text>
                    <TextInput
                        style={[styles.input, styles.textArea, isDark ? styles.inputDark : styles.inputLight]}
                        placeholder="Enter trade details, strategy, notes..."
                        placeholderTextColor={isDark ? '#5D667B' : '#9598A1'}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.button, isDark ? styles.buttonDark : styles.buttonLight]}
                    onPress={() => createTrade()}
                >
                    <Text style={[styles.buttonText, isDark ? styles.buttonTextDark : styles.buttonTextLight]}>
                        Log Trade
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );


}