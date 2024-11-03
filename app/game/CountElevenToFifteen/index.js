import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, Pressable, Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import ChoicesCard from './ChoicesCard';
import PseudoLoading from '../../screens/PseudoLoading';
import PoppingView from '../../components/PoppingView';
import { useNavigation, useRoute } from '@react-navigation/native';
import StarBar from '../../components/StarBar';
import { API_URL, useAuth } from '../../context/AuthContext';
import playSound from '../../components/PlaySound';
import getRandomNum from '../../components/getRandomNum';
import compliments from '../../model/compliments';
import tryagain from '../../model/tryagain';
import LibraryBg from '../../components/LibraryBg';
import ObjectImage from './ObjectImage';
import updateStudentStars from '../../components/updateStudentStars';
import computeStars from '../../components/compunteStars';
import AsyncStorage from '@react-native-async-storage/async-storage';
const bgImage = require('../../../assets/images/bg11-15.jpg');


const image1 = require('../../../assets/images/dog.png')
const image2 = require('../../../assets/images/cat.png')
const image3 = require('../../../assets/images/bird.png')
const image4 = require('../../../assets/images/ele.png')
const image5 = require('../../../assets/images/sheep.png')

const objectImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
]

function generateRandomSortedArray(min, max) {
    if (min > max) {
        // Swap min and max if min is greater than max
        [min, max] = [max, min];
    }
    const result = [];

    while (result.length < 4) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        // Check if the number is not already in the result array
        if (!result.includes(randomNumber)) {
            result.push(randomNumber);
        }
    }

    // Sort the array randomly using Fisher-Yates shuffle algorithm
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

const createArray = (length, value) => Array.from({ length }, () => value);

const CountElevenToFifteen = () => {
    const barWidth = useSharedValue('100%')
    const speakerScale = useSharedValue(1)
    const btnScale = useSharedValue(1)

    const route = useRoute()
    const { authState, setAuthState, setConfetti, games, setBgmusic, music } = useAuth()
    const navigate = useNavigation()
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

    const [isLoading, setIsLoading] = useState(true)
    const [level, setLevel] = useState(1)
    const [answer, setAnswer] = useState()
    const [correctAns, setCorrectAns] = useState()
    const [currentChoices, setCurrentChoices] = useState([])
    const [objectImgSrc, setObjectImgSrc] = useState()

    const [disabled, setDisabled] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [answerCorrect, setAnswerCorrect] = useState(false)

    useEffect(() => {
        setBgmusic(false)

        return () => setBgmusic(true)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            const random = generateRandomSortedArray(11, 15)
            playSound(require('../../../assets/audio/counttheobjects.mp3'))
            setCurrentChoices(random)
            setCorrectAns(random[getRandomNum(4)])
            setObjectImgSrc(objectImages[level - 1])
        }
    }, [isLoading])

    useEffect(() => {
        if (level > 5) {
            const foundLvl = games.find(lvl => lvl.url == route.name)
            const nextLvl = games.find(lvl => lvl.subject == foundLvl.subject && lvl.locked == true && lvl.id == foundLvl.id + 3)

            if (foundLvl.stars < 3) {
                const stars = computeStars(barWidth)
                foundLvl.stars = stars;
                if (nextLvl) nextLvl.locked = false

                updateStudentStars(stars, setAuthState, authState)

                const saveToStorage = async () => {
                    await AsyncStorage.setItem(authState.id, JSON.stringify(games))
                }
                saveToStorage()
            }
            playSound(require('../../../assets/audio/cheer.mp3'))
            setConfetti(true)
            navigate.navigate('Home')
            return;
        }

        const random = generateRandomSortedArray(11, 15)
        setCurrentChoices(random)
        setCorrectAns(random[getRandomNum(4)])
        setObjectImgSrc(objectImages[level - 1])
    }, [level])


    const decreaseStar = () => {
        playSound(require('../../../assets/audio/wrong.mp3'))
        setIncorrect(true)
        const numberString = barWidth.value.replace('%', '');
        const currentVal = JSON.parse(numberString);

        let res;
        if (currentVal >= 20) {
            res = `${currentVal - 10}%`
        } else {
            res = '10%'
        }
        barWidth.value = withSpring(res)
        setDisabled(false)
        playSound(tryagain[getRandomNum(4)])
    }


    const handleCheckBtnPress = () => {
        setDisabled(true)
        btnScale.value = 0.9;
        btnScale.value = withSpring(1);



        if (answer == correctAns) {
            playSound(require('../../../assets/audio/correct.mp3'))
            setAnswerCorrect(true)
            playSound(compliments[getRandomNum(7)])
            setTimeout(() => {
                setLevel(prev => prev + 1);
                setAnswerCorrect(false)
                setAnswer("")
                setDisabled(false)
            }, 1000)

        } else {
            decreaseStar()
        }

    }

    const objectImgEl = createArray(correctAns, 'any').map((_, index) => {
        return <ObjectImage key={index} souce={objectImgSrc} />
    })


    const choicesLvl1El = currentChoices.map((item, index) => {
        return (
            <ChoicesCard
                key={index}
                name={item}
                onClick={() => { setIncorrect(false); setAnswer(item); }}
                active={item == answer}
                wrong={incorrect && item == answer}
                correct={answer == correctAns && answerCorrect}
                disabled={disabled}
            />
        )
    })


    if (isLoading) return <PseudoLoading setIsLoading={setIsLoading} />
    return (
        <View style={{ flex: 1, backgroundColor: '#9accef' }}>

            {music && <LibraryBg />}

            <ImageBackground source={bgImage} style={styles.bgImage} resizeMode='cover'>
                <StarBar value={barWidth} />

                <PoppingView style={styles.menuBtn} onPress={() => navigate.navigate('Pause')} >
                    <Feather name='pause' color={'#FFF'} size={28} />
                </PoppingView>

                <Text style={styles.title}>Count the objects</Text>

                <View style={styles.container}>
                    <View style={styles.objectsContainer}>
                        {objectImgEl}
                    </View>
                    <View style={{ flexWrap: 'wrap', flex: 1, gap: 24 }}>
                        {choicesLvl1El}
                    </View>

                    <AnimatedPressable style={[{ transform: [{ scale: btnScale }] }, styles.checkBtn, { backgroundColor: disabled || answer == "" ? '#D1D1D1' : '#38D414', color: '#FFF' }]} onPress={handleCheckBtnPress} disabled={disabled || answer == ""}  >
                        <Text style={{ fontFamily: 'bold', color: '#FFF', letterSpacing: 1, fontSize: 20 }}>CHECK</Text>
                    </AnimatedPressable>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        padding: 16,

    },
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
    },
    speaker: {
        backgroundColor: '#2F9FF1',
        padding: 16,
        width: 80,
        height: 80,
        borderRadius: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#2F9FF1",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

    checkBtn: {
        backgroundColor: '#38D414',
        width: 300,
        display: 'flex',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10
    },
    menuBtn: {
        backgroundColor: '#D81C5A',
        borderRadius: 50,
        padding: 8,
        position: 'absolute',
        right: 16,
        top: 16
    },
    objectImg: {
        resizeMode: 'contain',
        width: 100,
        height: 100
    },
    objectsContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        maxWidth: 500,
    },
    title: {
        fontSize: 28,
        fontFamily: 'bold',
        color: '#FFF',
        letterSpacing: 2,
        marginTop: 10,
        marginLeft: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },

})

export default CountElevenToFifteen;
