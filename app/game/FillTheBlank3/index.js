import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, Pressable, Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import ChoicesCard from './ChoicesCard';
import PseudoLoading from '../../screens/PseudoLoading';
import PoppingView from '../../components/PoppingView';
import { useNavigation, useRoute } from '@react-navigation/native';
import StarBar from '../../components/StarBar';
import { useAuth } from '../../context/AuthContext';
import playSound from '../../components/PlaySound';
import getRandomNum from '../../components/getRandomNum';
import compliments from '../../model/compliments';
import tryagain from '../../model/tryagain';
import LibraryBg from '../../components/LibraryBg';
import updateStudentStars from '../../components/updateStudentStars';
import computeStars from '../../components/compunteStars';
import AsyncStorage from '@react-native-async-storage/async-storage';
const bgImage = require('../../../assets/images/farm.jpg');

const sound1 = require('../../../assets/audio/turtle.mp3')
const sound2 = require('../../../assets/audio/guitar.mp3')
const sound3 = require('../../../assets/audio/mirror.mp3')

function mixLetters(letter, length) {
    if (typeof letter !== 'string' || letter.length !== 1) {
        throw new Error('Invalid letter input. Please provide a single letter.');
    }

    if (!Number.isInteger(length) || length <= 0) {
        throw new Error('Invalid length input. Please provide a positive integer.');
    }

    const result = new Set([letter]); // Start with the given letter as a Set to avoid duplications

    while (result.size < length) {
        const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        result.add(randomLetter);
    }

    // Convert the Set back to an array and shuffle
    const shuffledArray = Array.from(result);
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

const FillTheBlank3 = () => {
    const barWidth = useSharedValue('100%')
    const speakerScale = useSharedValue(1)
    const btnScale = useSharedValue(1)

    const Obj1 = { word: ['T', 'U', 'R', 'T', 'L', 'E'], sound: sound1, img: require('../../../assets/images/turtle.png') }
    const Obj2 = { word: ['G', 'U', 'I', 'T', 'A', 'R'], sound: sound2, img: require('../../../assets/images/guitar.png') }
    const Obj3 = { word: ['M', 'I', 'R', 'R', 'O', 'R'], sound: sound3, img: require('../../../assets/images/mirror.png') }

    const allChoices = [Obj1, Obj2, Obj3]

    const { authState, setAuthState, setConfetti, games, setBgmusic, music } = useAuth()
    const route = useRoute()
    const navigate = useNavigation()
    const AnimatedView = Animated.createAnimatedComponent(View)
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

    const [isLoading, setIsLoading] = useState(true)
    const [level, setLevel] = useState(1)
    const [currentChoices, setCurrentChoices] = useState([])
    const [currentWord, setCurrentWord] = useState([])
    const [answer, setAnswer] = useState('')
    const [correctAns, setCorrectAns] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [answerCorrect, setAnswerCorrect] = useState(false)

    useEffect(() => {
        setBgmusic(false)

        return () => setBgmusic(true)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            playSound(require('../../../assets/audio/filltheblank.mp3'))
        }
    }, [isLoading])

    useEffect(() => {
        if (level > 3) {
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
        }

        const index = level > allChoices.length ? allChoices.length - 1 : level - 1;

        const generateChoices = allChoices[index]
        const ans = generateChoices.word[getRandomNum(generateChoices.word.length)]
        setCurrentWord(generateChoices)
        setCorrectAns(ans)
        setCurrentChoices(mixLetters(ans, 4))
    }, [level])

    const handleSpeakerPress = () => {
        playSound(currentWord.sound)

        speakerScale.value = 0.8;
        speakerScale.value = withSpring(1);
    }

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

    const wordEl = currentWord.word?.map((item, index) => {
        if (item == correctAns) {
            return "_"
        }
        return item
    }).join('')

    if (isLoading) return <PseudoLoading setIsLoading={setIsLoading} />
    return (
        <View style={{ flex: 1, backgroundColor: '#9accef' }}>
            {music && <LibraryBg />}
            <ImageBackground source={bgImage} style={styles.bgImage} resizeMode='cover'>
                <StarBar value={barWidth} />

                <PoppingView style={styles.menuBtn} onPress={() => navigate.navigate('Pause')} >
                    <Feather name='pause' color={'#FFF'} size={28} />
                </PoppingView>

                <View style={styles.container}>
                    <Pressable onPress={handleSpeakerPress} disabled={disabled}>
                        <AnimatedView style={[{ transform: [{ scale: speakerScale }] }, styles.speaker, { borderWidth: 3, borderColor: answer == correctAns && answerCorrect ? '#38D414' : '#3d3d59' }]}>
                            <Image source={currentWord.img} style={styles.objImg} />
                            <Text style={styles.text}>{answer == correctAns && answerCorrect ? currentWord.word.join('') : wordEl}</Text>
                        </AnimatedView>
                    </Pressable>

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
        marginTop: 16
    },
    speaker: {
        position: 'relative',
        backgroundColor: '#FFF',
        minWidth: 150,
        height: 150,
        padding: 16,
        borderRadius: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    objImg: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
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
    text: {
        fontFamily: 'bold',
        fontSize: 28,
        letterSpacing: 10,
        color: '#3d3d59',

    }

})

export default FillTheBlank3;
