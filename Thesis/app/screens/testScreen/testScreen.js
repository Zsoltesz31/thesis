import React, { useState, useEffect, useRef } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  FlatList,
  Alert,
} from "react-native";
import CustomHeader from "../../../components/header/header";
import { Ionicons } from "@expo/vector-icons";
import { ConfirmationModal } from "../../../components/modals/confirmation_modal";
import { TestScreenStyle } from "./style";
import { OptionChoiceQuestion } from "../../../components/questionComponents/optionChoiceQuestion/optionChoiceQuestion";
import { MultipleOptionQuestion } from "../../../components/questionComponents/multipleOptionQuestion/multipleOptionQuestion";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../../components/buttons/buttons";
import { setFillEndTest } from "../../../slices/fillTestSlice";


export default function TestScreen({ navigation, route }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [testFilled,setTestFilled] = useState(false)
  const [fillAnswers, setFillAnswers] = useState(false);
  const { testById } = useSelector((state) => state.test);
  const { startedTest } = useSelector((state) => state.fill);
  const [timer, setTimer] = useState("00:00:00");
  const Ref = useRef(null);
  const dispatch=useDispatch()


  const modalClose = () => {
    setIsModalVisible(false);
  };

  const modalCloseOnExit = () =>{
    setIsModalVisible(false);
    navigation.replace('Kurzusaid')
  }


  const getTimeRemaining = (time) => {
    const d = Date.parse(time) - Date.parse(new Date());
    const seconds = Math.floor((d / 1000) % 60);
    const minutes = Math.floor((d / 1000 / 60) % 60);
    const hours = Math.floor((d / 1000 / 60 / 60) % 24);
    return {
      d,
      seconds,
      minutes,
      hours,
    };
  };

  const startTimer = (e) => {
    let { d, seconds, minutes, hours } = getTimeRemaining(e);
    if (d >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };



  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + 60);
    return deadline;
  };

  useEffect(() => {
   clearTimer(getDeadTime());
  }, []);

  const onLeaveTest = () =>{
    console.log('EZLEFUT?')
    console.log('ASDASDASD:',startedTest)
    setFillAnswers(true)
    dispatch(setFillEndTest(startedTest.id))
    setTestFilled(true)

  }

  const onBackButtonPress = () => {
    Alert.alert(
      "Biztosan elhagyja a tesztet?",
      "Ha elhagyja az eddig jelölt vagy nem jelölt válaszokkal adja le a tesztet.",
      [
        {
          text: "Elhagyom",
          style: "destructive",
          onPress: () => {navigation.navigate("Kurzusaid"),onLeaveTest()},
        },
        {
          text: "Maradok",
          style: "cancel",
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    if (item.type == "SELECT_ONE") {
      return (
        <OptionChoiceQuestion
          questionId={item.id}
          questionData={item}
          fillAnswer={fillAnswers}
          upcomingTestId={route.params.upTestId}
        ></OptionChoiceQuestion>
      );
    } else if (item.type == "SELECT_MORE") {
      return (
        <MultipleOptionQuestion
          questionId={item.id}
          questionData={item}
          fillAnswer={fillAnswers}
          upcomingTestId={route.params.upTestId}
        ></MultipleOptionQuestion>
      );
    }
  };

  return (
    <SafeAreaView style={TestScreenStyle.screenContainer}>
      <CustomHeader />
      <View style={TestScreenStyle.titleContainer}>
        <Pressable
          style={TestScreenStyle.icon}
          onPress={() => onBackButtonPress()}
        >
          <Ionicons name={"chevron-back-outline"} size={25} color={"white"} />
        </Pressable>
        <Text style={TestScreenStyle.title}>{timer}</Text>
      </View>
      <View style={TestScreenStyle.questionContainer}>
        <FlatList
          data={testById.Questions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <ConfirmationModal visible={isModalVisible} onClose={modalClose}>
        <View style={TestScreenStyle.modalContent}>
          <Text style={TestScreenStyle.modalTitle}>
            Biztosan befejezi a tesztet?
          </Text>
          {!testFilled &&
          <>
          <CustomButton
            onPress={() => onLeaveTest()}
            buttonName={"Igen"}
          ></CustomButton>
          <CustomButton
            buttonName={"Nem"}
            onPress={() => modalClose()}
          ></CustomButton>
          </>
          }
          {testFilled &&
          <>
          <Text>Teszt leadva!</Text>
          <CustomButton
            buttonName={"Kilépés"}
            onPress={() => modalCloseOnExit()}
          ></CustomButton>
          </>
          }
        </View>
      </ConfirmationModal>
      <CustomButton
        buttonName={"Befejezés"}
        onPress={() => setIsModalVisible(true)}
      ></CustomButton>
    </SafeAreaView>
  );
}
