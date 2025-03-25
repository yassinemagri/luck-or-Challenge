import React, { useState,useEffect, useRef  } from "react";
import { Button } from "@/components/ui/button";
import { CiMaximize2 } from "react-icons/ci";
import { CiMinimize1 } from "react-icons/ci";
import { cn } from "@/lib/utils"
import PixelStars from "./PixelStars";

const Home = () => {
  const [blockNum, setBlockNum] = useState(() =>
    Math.floor(Math.random() * 5 + 1)
  );
  const [result, setResult] = useState("?")
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [msgNoRes, setMsgNoRes] = useState(false)
  const lobbyRef = useRef(null)
  const questionBlockRef = useRef(null)
  const [winEffect, setWinEffect] = useState(false)
  
  const [showQuestion, setShowQuestion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timerId, setTimerId] = useState(null);
  
  const questions = [
    { answer1: "العيش بدون إنترنت؟", answer2: "بدون كهرباء؟" },
    { answer1: "العودة للماضي؟", answer2: "معرفة المستقبل؟" },
    { answer1: "النوم مرة في الأسبوع؟", answer2: "الأكل مرة في الأسبوع؟" },
    { answer1: "فقدان القدرة على الكذب؟", answer2: "فقدان القدرة على قول الحقيقة؟" },
    { answer1: "أن تكون عالقًا في مكان مظلم بدون مخرج؟", answer2: "أن تسمع أصواتًا لا تعرف مصدرها؟" },
    { answer1: "أن ترى شيء غير موجود؟", answer2: "أن يكون أحدهم يراقبك باستمرار؟" },
    { answer1: "أن تكون وحيدًا في غرفة مليئة بالمرآة؟", answer2: "أن تجد صورك في أماكن غريبة؟" },
    { answer1: "أن ترى شخصًا ميتًا يعود للحياة؟", answer2: "أن تشاهد شخصًا يتنكر في شكلك؟" },
    { answer1: "أن تشعر بأنك لا تستطيع التنفس؟", answer2: "أن تجد نفسك عالقًا في مكان ضيق؟" },
    { answer1: "أن تكون محاطًا بأصوات غير مفهومة؟", answer2: "أن تشعر بحركة غير مرئية من حولك؟"},
    { answer1: "أن تكون عالقًا في مكان تحت الأرض؟", answer2: "أن تكون في جزيرة مهجورة؟" },
    { answer1: "أن تشعر بشيء ثقيل على صدرك؟", answer2: "أن تجد نفسك محاطًا بضباب كثيف؟" },
    { answer1: "أن تسمع أصواتًا تطلب مساعدتك؟", answer2: "أن ترى ظلًا يتحرك خلفك؟" },
    { answer1: "أن تجد بابًا مغلقًا في مكان لا تعرفه؟", answer2: "أن تجد ممرًا يؤدي إلى مكان مظلم؟" },
    { answer1: "أن تكون في مكان يعيد نفسه كل يوم؟", answer2: "أن ترى مخلوقًا غير طبيعي؟" },
    { answer1: "أن تجد رسالة من شخص ميت؟", answer2: "أن تتلقى مكالمة من رقم مجهول؟" },
    { answer1: "أن تكون داخل غرفة بدون نوافذ؟", answer2: "أن تجد نفسك عائدًا لنفس المكان مرارًا؟" },
    { answer1: "أن تختفي من دون أن يلاحظك أحد؟", answer2: "أن تجد شخصًا يشبهك تمامًا؟" },
    { answer1: "أن تسمع خطوات خلفك في الظلام؟", answer2: "أن تجد أبوابًا مغلقة لا تعرف كيف أغلقت؟" },
    { answer1: "أن تجد نفسك في مكان لا تعرفه؟", answer2: "أن تشعر بأنك عائد للماضي؟" },
    { answer1: "أن ترى شخصًا ميتًا يبتسم لك؟", answer2: "أن تجد أحدهم يراقبك في كل مكان؟" },
    { answer1: "أن تكون محاطًا بأشخاص لا يتحدثون؟", answer2: "أن تسمع همسات غير مفهومة؟" },
    { answer1: "أن تجد ساعة توقفت فجأة؟", answer2: "أن تشعر بالزمن يتسارع من حولك؟" },
    { answer1: "أن تجد شخصًا مفقودًا في مكان غريب؟", answer2: "أن تجد شيئًا مختفيًا لفترة طويلة؟" },
    { answer1: "أن تجد أن كل شيء من حولك يعيد نفسه؟", answer2: "أن تشعر بأنك عالق في حلقة زمنية؟" },
    { answer1: "أن تكون محاطًا بشخصيات غريبة؟", answer2: "أن تشاهد شيء يتحرك بشكل غريب في الظلام؟" },
    { answer1: "أن ترى شخصًا ميتًا وهو ينادي باسمك؟", answer2: "أن تشعر بشيء يلمسك من خلفك؟" },
    { answer1: "أن تجد هاتفًا يعرض رسائل غريبة؟", answer2: "أن تسمع صوتك يرد عليك من مكان آخر؟" },
    { answer1: "أن تجد نفسك في مكان لا مخرج له؟", answer2: "أن تجد صورًا لك في أماكن لا تذكر زيارتها؟" },
    { answer1: "أن تجد نفسك عائدًا إلى نقطة البداية؟", answer2: "أن تجد شيئًا مفقودًا يعود فجأة؟" },
    { answer1: "أن تشعر بأنك لا تسيطر على جسدك؟", answer2: "أن تجد حروفًا غريبة على جدار مكان مظلم؟" },
    { answer1: "أن تجد صورك تتغير في كل مرة تنظر إليها؟", answer2: "أن تجد أن كل شيء من حولك يعكس أشياء غريبة؟" },
    { answer1: "أن تجد نفسك محاطًا بالضباب؟", answer2: "أن تجد شخصًا عجيب الشكل يظهر فجأة؟" },
    { answer1: "أن تشعر بأنك مكشوف للأعين في مكان بعيد؟", answer2: "أن تجد نفسك في مكان مزخرف بالكلمات المريبة؟" },
    { answer1: "أن تجد نفسك في مكان لا تذكر كيف وصلت إليه؟", answer2: "أن تجد رسائل تنبؤك بمستقبل غريب؟" },
    { answer1: "أن تسمع نقرات في جدران منزلك؟", answer2: "أن تجد شخصًا يبتسم لك في الظلام؟" },
    { answer1: "أن تجد فجأة بابًا يؤدي إلى مكان غير مألوف؟", answer2: "أن تشعر بأنك عائد لنفس المكان مرارًا؟" },
    { answer1: "أن تشعر بشيء ثقيل يضغط على صدرك؟", answer2: "أن تسمع أصواتًا من خلف الجدران؟" },
    { answer1: "أن تجد شخصًا يراك دون أن تراه؟", answer2: "أن تشعر بأنك متبع من شخص لا تراه؟" },
    { answer1: "أن تجد عيونًا تراقبك من كل زاوية؟", answer2: "أن تشعر بأنك محاصر في مكان غير واضح؟" },
  ];
  
    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        lobbyRef.current?.requestFullscreen()
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  console.log(blockNum)

  const handlePlayerGuess = (guess) => {
    setShowAnimation(true);
  
    if (guess === blockNum) {
      setWins((prev) => prev + 1);
      setResult("$");
      setWinEffect(true);
      setTimeout(() => {
        setResult("?");
        setShowAnimation(false);
      }, 2000);
    } else {
      setLosses((prev) => prev + 1);
      setResult(blockNum.toString());
      setTimeout(() => setResult(":P"), 1000);
      setTimeout(() => {
        setResult("?");
        setShowAnimation(false);
        setShowQuestion(true);
        setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
        setTimeLeft(20);
  
        const id = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev === 1) {
              clearInterval(id);
              setShowQuestion(false);
              setWins((prev) => prev - 1); 
            }
            return prev - 1;
          });
        }, 1000);
        setTimerId(id);
      }, 2000);
    }
    setBlockNum(Math.floor(Math.random() * 5 + 1));
  };
  
  const handleCheat = () => {
    handlePlayerGuess(blockNum);
  };
  
  return (
    <div ref={lobbyRef} className="flex font-Tajawal relative flex-col items-center justify-center min-h-screen p-4 font-pixel text-[#f4f4f4]">
      <div className="absolute top-0 left-0 w-4 h-4 bg-[#5d275d]"></div>
      <div className="absolute top-0 right-0 w-4 h-4 bg-[#5d275d]"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#5d275d]"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#5d275d]"></div>
      {showQuestion && currentQuestion && (
    <div className="fixed z-1 inset-0 bg-[rgba(255, 255, 255, 0.2)] backdrop-filter-[blur(5px)] flex items-center justify-center">
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold text-yellow-300 mb-4">لو خيروك؟</h2>
      <div className="flex gap-4 max-sm:flex-col">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white p-16 rounded cursor-pointer"
          onClick={() => {
            clearInterval(timerId);
            setShowQuestion(false);
          }}
        >
          {currentQuestion.answer1}
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-700 text-white p-16 rounded cursor-pointer"
          onClick={() => {
            clearInterval(timerId);
            setShowQuestion(false);
          }}
        >
          {currentQuestion.answer2}
        </Button>
      </div>
      <p className="text-red-400 mt-4">الوقت المتبقي: {timeLeft} ثانية</p>
    </div>
  </div>
)}


      <div className="absoulte"><PixelStars count={30} /></div>
      <div className="relative p-8 bg-[rgba(255, 255, 255, 0.2)] border-8 border-[#334155] rounded-2xl  shadow-lg backdrop-filter-[blur(5px)] max-w-lg w-full flex flex-col items-center sm:p-4 sm:border-4">
        <div className="absoulte top-1 w-full flex justify-end mb-6">
          <Button
            variant="outline"
            size="icon"
            className="pixel-button cursor-pointer bg-[#38b764] hover:bg-[#3b9e58] text-white border-[#1a1c2c] border-2"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <CiMinimize1 className="h-4 w-4" /> : <CiMaximize2 className="h-4 w-4" />}
          </Button>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-white -rotate-2 shadow-[3px_3px_0_#4c1d95,6px_6px_0_#2563eb] tracking-wider sm:text-3xl">الحظ أو التحدي</h1>

        <div className="flex space-x-2 mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 w-0 h-0 p-0 m-0 overflow-hidden cursor-pointer"
            accessKey="w"
            onClick={handleCheat}
          />
        </div>
        <div className="text-center mb-6 rtl">
          <p className="text-lg text-[#faef5d] pixel-text">اختر حظك من 1 الى 10</p>
        </div>
        <div className="flex justify-center items-center text-3xl m-8 w-full max-w-md mt-4 p-4 bg-[#475569] border-2 border-[#334155] rounded sm:text-[10px] sm:p-1">
          <div className="flex items-center gap-2 sm:gap-1 px-4 text-lg">
            <span className="text-red-500">{losses}</span>
            <span className="text-red-100">:الخسائر</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-1 px-4 text-lg">
            <span className="text-green-500">{wins}</span>
            <span className="text-green-100">:الفوز</span>
          </div>
        </div>
        <div
          ref={questionBlockRef}
          className={`w-24 h-24 mb-8 bg-[#fbbf24] bg-question-pattern border-4 border-[#92400e] shadow-[0_8px_0_#78350f,0_0_0_4px_#0f172a] rounded flex items-center justify-center relative transition-transform duration-100 hover:-translate-y-1 hover:scale-105 active:translate-y-1 active:scale-95 active:shadow-[0_4px_0_#78350f,0_0_0_4px_#0f172a] ${winEffect ? "animate-win" : ""}`}
        >
          <span className="text-4xl font-bold text-[#0f172a] cursor-none" style={{ textShadow:'2px 2px 0 #f8fafc'}}>{result}</span>
        </div>
        <div className="grid grid-cols-5 gap-3 mb-6">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
            <Button
              key={num}
              id={`btn${num}`}
              onClick={() => handlePlayerGuess(num)}
              className="w-12 h-12 bg-[#0ea5e9] text-white border-0 border-b-4 border-r-4 border-[#0369a1] rounded font-bold text-xl flex items-center justify-center transition-all duration-100 hover:-translate-y-0.5 hover:bg-sky-400 active:translate-y-0.5 active:border-b-2 active:border-r-2 md:w-10 md:h-10 md:text-lg sm:w-8 sm:h-8 sm:text-base cursor-pointer"
              
            >
              {num}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
