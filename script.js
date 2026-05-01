const questions = [
  {q:"What is AI?",o:["Machine intelligence","Human brain","Database","None"],a:0,cat:"AI/ML",hint:"Think machines"},
  {q:"HTML stands for?",o:["Hyper Text Markup Language","High Tool ML","Hyperlinks","None"],a:0,cat:"Web Dev",hint:"Markup"},
  {q:"SQL is used for?",o:["Data","Design","Security","Gaming"],a:0,cat:"Data Science",hint:"Database"},
  {q:"Firewall protects?",o:["Network","CPU","RAM","Disk"],a:0,cat:"Cybersecurity",hint:"Network"},
  {q:"Binary uses?",o:["0 & 1","1 & 2","2 & 3","None"],a:0,cat:"General CS",hint:"Two digits"},
];

// Duplicate to make 30
while(questions.length<30){
  questions.push({...questions[questions.length%5]});
}

let current=0,score=0,correct=0,timeLeft=30,timer;
let lifelines={fifty:true,skip:true,hint:true};

const startBtn=document.getElementById("startBtn");
startBtn.onclick=startGame;

function startGame(){
  document.getElementById("welcomeScreen").classList.remove("active");
  document.getElementById("quizScreen").classList.add("active");
  loadQuestion();
}

function loadQuestion(){
  if(current>=15) return showResult();

  const q=questions[current];
  document.getElementById("qNumber").innerText=`Q ${current+1}/15`;
  document.getElementById("question").innerText=q.q;
  
  const optDiv=document.getElementById("options");
  optDiv.innerHTML="";
  
  q.o.forEach((opt,i)=>{
    const btn=document.createElement("div");
    btn.className="option";
    btn.innerText=opt;
    btn.onclick=()=>selectAnswer(i);
    optDiv.appendChild(btn);
  });

  startTimer();
}

function startTimer(){
  timeLeft=30;
  const bar=document.getElementById("timerBar");
  timer=setInterval(()=>{
    timeLeft--;
    bar.style.width=(timeLeft/30*100)+"%";
    if(timeLeft<10) bar.style.background="#FF4444";
    if(timeLeft<=0){
      clearInterval(timer);
      nextQuestion();
    }
  },1000);
}

function selectAnswer(i){
  clearInterval(timer);
  const q=questions[current];
  const options=document.querySelectorAll(".option");

  if(i===q.a){
    options[i].classList.add("correct");
    score+=10;
    if(timeLeft>20) score+=5;
    correct++;
  }else{
    options[i].classList.add("wrong");
    options[q.a].classList.add("correct");
  }

  document.getElementById("score").innerText="Score: "+score;

  setTimeout(nextQuestion,1500);
}

function nextQuestion(){
  current++;
  loadQuestion();
}

document.getElementById("fifty").onclick=()=>{
  if(!lifelines.fifty) return;
  lifelines.fifty=false;

  const q=questions[current];
  let removed=0;
  document.querySelectorAll(".option").forEach((el,i)=>{
    if(i!==q.a && removed<2){
      el.style.visibility="hidden";
      removed++;
    }
  });
};

document.getElementById("skip").onclick=()=>{
  if(!lifelines.skip) return;
  lifelines.skip=false;
  nextQuestion();
};

document.getElementById("hint").onclick=()=>{
  if(!lifelines.hint) return;
  lifelines.hint=false;
  alert(questions[current].hint);
};

function showResult(){
  document.getElementById("quizScreen").classList.remove("active");
  document.getElementById("resultScreen").classList.add("active");

  let percent=(score/150)*100;
  let grade=percent>80?"A":percent>60?"B":percent>40?"C":"F";

  document.getElementById("finalScore").innerText=`Score: ${score}`;
  document.getElementById("grade").innerText=`Grade: ${grade}`;
  document.getElementById("performance").innerText=`Correct: ${correct}/15`;

  saveLeaderboard(score);
}

function saveLeaderboard(score){
  let data=JSON.parse(localStorage.getItem("leaderboard"))||[];
  data.push({name:document.getElementById("playerName").value,score,date:new Date().toLocaleDateString()});
  data.sort((a,b)=>b.score-a.score);
  data=data.slice(0,5);
  localStorage.setItem("leaderboard",JSON.stringify(data));

  const list=document.getElementById("leaderList");
  list.innerHTML="";
  data.forEach(p=>{
    const li=document.createElement("li");
    li.innerText=`${p.name} - ${p.score}`;
    list.appendChild(li);
  });

  document.getElementById("highScore").innerText=data[0]?.score||0;
}

document.getElementById("shareBtn").onclick=()=>{
  navigator.clipboard.writeText(`I scored ${score} in Tech Quiz Battle!`);
  alert("Copied!");
};